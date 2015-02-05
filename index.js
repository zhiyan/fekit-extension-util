var fs = require('fs'),
	path = require('path'),
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

    return optimist.describe('l', '列出所有fekit工具函数').alias('l','list')
    			   .describe('i', '安装fekit工具函数').alias('i','install')
    			   .describe('t', '测试').alias('t','test')

}

exports.run = function( options ){

    if( options.list ){
    	return list()
    }

    if( options.install ){
    	return install( options )
    }

    if( options.test ){
    	return test( options )
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
			console.log( '  ' + pathname + '\t\t#' + data )
		}
	})
}

// command : 安装工具函数
function install( options ){

	var config,
		fekitCompileType,
		source,
		utilNames,
		name = options.install

	// 创建配置文件
	if( !fs.existsSync( configFile ) ){
		fs.createWriteStream( configFile )
		writeConfigFile( defaultOptions )
		log( '创建配置文件成功' )

		log( '开始安装fekitUtil组件...' )
		createFekitUtil()
		log( '安装fekitUtil组件成功')
	}

	// 未成功拉取fekitUtil的处理
	if( !fs.existsSync( fekitUtilPath ) ){
		log( '安装fekitUtil未成功，请检查网络环境')
		log( '\n或执行fekit install fekitUtil后再试')
		return
	}

	// 无参数直接返回
	if( typeof options.install === 'boolean') return;

	// 读取configFile
	config = readConfigFile()
	
	// 读取util目录
	utilNames = getAvailableUtils()

	if( !~utilNames.indexOf( options.install ) ){
		utils.logger.error( '未找到' + name + '函数组件' )
	}
	if( ~config.installed_utils.indexOf( options.install ) ){
		log( name + '函数已安装' )
		return
	}

	// 开始安装
	log( '开始安装' + name + '函数...' )

	source = {}

	config.installed_utils.forEach( function(utilName){
		source[utilName] = '#' + utilName
	} )

	source[ name ] = '#' + name

	// console.log(source)

	source = JSON.stringify( source, null, 4 )

	fekitCompileType = getFekitCompileType()

	if( fekitCompileType === 'modular' ){
		source = "module.exports = " + source
	}else{
		source = "window.fekitUtil = " + source
	}

	source = install_function( source )

	writeFekitUtil( install_function( source ) )

	// 写入config配置
	config.installed_utils.push( name )
	writeConfigFile( config )
	log( name + '函数组件安装完成!' )

}

function test( options ){
	console.log("test start")
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

// 安装fekitUtil组件
function createFekitUtil(){
	exec('fekit install fekitUtil',function( error, stdout, stderr ){
		console.log(stdout);
	})
	sleep(5000);
}

// 模拟阻塞
function sleep(milliSeconds) { 
    var startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + milliSeconds);
};