source "https://rubygems.org"

# Use Jekyll 4.x for compatibility and modern features
gem "jekyll", "~> 4.3"

# Use sassc instead of deprecated Ruby Sass
gem "sassc", "~> 2.0"

# Essential plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem "jekyll-sitemap" # Recommended for SEO
  gem "jekyll-seo-tag" # Enhances metadata for search engines
  gem "jekyll-postcss" # For PostCSS integration
end

# Handle Markdown with GitHub Flavored Markdown
gem "kramdown-parser-gfm"

# Required for compatibility with Ruby 3.x
gem "webrick"

# Time zone support for Windows
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance booster for directory watching on Windows
gem "wdm", "~> 0.1.0", platforms: [:mingw, :x64_mingw, :mswin]
