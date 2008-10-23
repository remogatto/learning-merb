require 'cucumber/rake/task'

Cucumber::Rake::Task.new do |t|
  t.cucumber_opts = "--format pretty"
end

desc 'Run cucumber features'
task :run_features => ['db:automigrate', 'features']

