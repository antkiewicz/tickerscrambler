module.exports = function(grunt) {
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: 'src/<%= pkg.name %>.js'
		},
		uglify: {
			options: {
				banner: '/* <%= pkg.name %>.js v<%= pkg.version %>, Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>, <%= pkg.license %> License */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task.
	grunt.registerTask('default', ['jshint', 'uglify']);
	// Test task
	grunt.registerTask('test', ['jshint']);
}
