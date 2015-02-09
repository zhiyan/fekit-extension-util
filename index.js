var fs = require('fs'),
	path = require('path'),
	pad = require('pad'),
	exec = require('child_process').exec,
	basePath = '.',
	baselib = path.join( module.parent.filename , '../' ),
	utils = require( path.join( baselib , 'util'  ) ),
	log = utils.logger.log,
	utilPath = path.join( __dirname, 'src' ),
	configFile = path.join( basePath, 'fekit.util.config'),
	fekitConfigFile = path.join( basePath, 'fekit.config'),
	fekitUtilPath = path.join( basePath, 'fekit_modules/fekitUtil/src/index.js')

var defaultOptions = {
	// 'javascript_path' : 'scripts',
	// 'style_path' : 'styles',
	'installed_utils' : []
}

exports.usage = 'fekit工具函数库';

exports.set_options = function( optimist ){

    return optimist.describe('init', '初始化fekit util')
    			   .describe('l', '列出所有fekit工具函数').alias('l','list')
    			   .describe('g', '显示fekit工具函数').alias('g','get')
    			   .describe('i', '安装fekit工具函数').alias('i','install')
    			   .describe('u', '卸载fekit工具函数').alias('u','uninstall')
    			   

}

exports.run = function( options ){

    if( options.init ){
    	return init( options )
    }

    if( options.list ){
    	return list()
    }

    if( options.install ){
    	return install( options )
    }

    if( options.get ){
    	return get( options )
    }

    if( options.uninstall ){
    	return uninstall( options )
    }

    // 默认调出帮助
    exec('fekit util -h',function( error, stdout, stderr ){
    	console.log( stdout )
		console.log( stderr )
	})

}

// command : 初始化fekit util
function init(){
	// 创建配置文件
	if( !fs.existsSync( configFile ) ){
		fs.createWriteStream( configFile )
		writeConfigFile( defaultOptions )
		log( '创建配置文件成功' )
		log( '开始安装fekitUtil组件...' )
		createFekitUtil()
	}else{
		log( '已检测到配置文件.' )
	}
}

// command : 列出所有fekit工具函数
function list(){
	var utilNames = getAvailableUtils()

	utilNames.forEach(function( pathname ){
		var p = path.join( utilPath, pathname )
		if( fs.statSync( p ).isDirectory() ){
			// TODO: readme大小写忽略 
			var data = fs.readFileSync( path.join( p, 'readme.md' ), 'utf-8' )
			console.log( '  ' + pad(pathname,40) + '#' + data.replace(/^\s*|\s*$/g,"") )
		}
	})
}

// command: 显示fekit工具函数
function get( options ){
	var name = options.get,
		utilNames = getAvailableUtils(),
		file

	if( name === true ){
		utils.logger.error( '请输入函数名称, 使用fekit util --list 查看所有函数' )
		return
	}

	if( !~utilNames.indexOf( name ) ){
		utils.logger.error( '未找到' + name + '函数组件' )
		return
	}

	file = fs.readFileSync( path.join(utilPath, name, 'index.js'), 'utf-8')
	console.log(file)
}

// command : 安装工具函数
function install( options ){

	var config,
		source,
		utilNames,
		name = options.install

	if( !isInited( options ) ) return

	// 读取configFile
	config = readConfigFile()
	
	// 读取util目录
	utilNames = getAvailableUtils()

	if( !~utilNames.indexOf( name ) ){
		utils.logger.error( '未找到' + name + '函数组件' )
		return
	}
	if( ~config.installed_utils.indexOf( name ) ){
		log( name + '函数已安装' )
		return
	}

	// 开始安装
	log( '开始安装' + name + '函数...' )

	source = {}
	source[ name ] = '#' + name

	source = handleData( source, config )

	writeFekitUtil( source )

	// 写入config配置
	config.installed_utils.push( name )
	writeConfigFile( config )
	log( name + '函数组件安装完成!' )

}

// command : 卸载工具函数
function uninstall( options ){

	var config,
		source,
		name = options.uninstall

	if( !isInited( options ) ) return

	// 读取configFile
	config = readConfigFile()

	if( !~config.installed_utils.indexOf( options.uninstall ) ){
		log( name + '函数尚未安装' )
		return
	}

	// 写入config配置
	config.installed_utils.splice( config.installed_utils.indexOf(name), 1 )
	writeConfigFile( config )

	// 开始安装
	log( '开始卸载' + name + '函数...' )

	source = handleData( {}, config )

	writeFekitUtil( source )	
	log( name + '函数组件卸载完成!' )
}

/*=============== 内部调用方法=================*/

// 写入配置文件
function writeConfigFile( options ){
	fs.writeFileSync( configFile, JSON.stringify( options, null, 4 ) )
}

// 读取配置文件
function readConfigFile( options ){
	return JSON.parse( fs.readFileSync( configFile, 'utf-8' ) );
}

// 获取项目的fekit编译模式文件
function getFekitCompileType(){
	return JSON.parse( fs.readFileSync( fekitConfigFile, 'utf-8' ) ).compiler;
}

// 读取util
function getAvailableUtils(){
	return fs.readdirSync( utilPath )
}

// 读取fekitUtil文件
function readFekitUtil(){
	return JSON.parse( fs.readFileSync( fekitUtilPath, 'utf-8' ).replace(/^[^{]*/,'') || '{}' );
}

// 写入fekitUtil文件
function writeFekitUtil( data ){
	fs.writeFileSync( fekitUtilPath, data )
}

// 安装函数
function install_function( data ){
	data = data.replace(/"#([^"]*)"/g,function( scope, name ){
		var filePath = path.join(utilPath, name, 'index.js'),
			file = fs.readFileSync( filePath, 'utf-8' ).replace(/^\s*(function)[^(]*/,'$1')
		return file
	});	
	return data
}

// 检测是否初始化
function isInited( options ){
	// 创建配置文件
	if( !fs.existsSync( configFile ) ){
		utils.logger.error( '未初始化fekit util, 请使用fekit util --init初始化配置文件' )
		return false
	}

	// 未成功拉取fekitUtil的处理
	if( !fs.existsSync( fekitUtilPath ) ){
		log( '安装fekitUtil未成功，请检查网络环境')
		log( '\n或执行fekit install fekitUtil后再试')
		return false
	}

	// 无参数直接返回
	if( typeof options.install === 'boolean') return false;

	return true
}

// 安装fekitUtil组件
function createFekitUtil(){
	exec('fekit install fekitUtil',function( error, stdout, stderr ){
		console.log(stdout);
		log( '安装fekitUtil组件完成' )
	})
}

// 处理文件内容
function handleData( source, config ){

	config.installed_utils.forEach( function(utilName){
		source[utilName] = '#' + utilName
	} )

	source = JSON.stringify( source, null, 4 )

	if( getFekitCompileType() === 'modular' ){
		source = "module.exports = " + source
	}else{
		source = "window.fekitUtil = " + source
	}

	source = install_function( source )

	return source
}

// 模拟阻塞
function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
}