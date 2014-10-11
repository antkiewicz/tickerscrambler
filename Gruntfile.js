module.exports = function(grunt) {
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: '<%= pkg.name %>.js'
		},
		uglify: {
			options: {
				banner: '/* <%= pkg.name %>.js v<%= pkg.version %>, Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>, <%= pkg.license %> License */\n'
			},
			build: {
				src: '<%= pkg.name %>.js',
				dest: '<%= pkg.name %>.min.js'
			}
		},
		watch: {
			files: ['<%= pkg.name %>.js'],
			tasks: ['jshint']
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', ['jshint', 'uglify']);
	// Test task
	grunt.registerTask('test', ['jshint']);
}
