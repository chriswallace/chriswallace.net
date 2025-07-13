<!DOCTYPE html>
<html lang="en">
  {% include head.md %}
  <body class="home">
    <!-- Main page content (initially hidden) -->
    <main class="content">
      <div class="ui-frame main-content">
        <div class="ui-navbar">
          {% include header.md %}
        </div>
        <div class="ui-content">
          <div class="{{ page.markdown }} page-content">
            {{ content }}
          </div>
          {% include footer.md %}
        </div>
      </div>
    </main>

    <!-- Reveal overlay system -->
    <div class="revealer">
      <div class="revealer__layer revealer__layer--1"></div>
      <div class="revealer__layer revealer__layer--2"></div>
      <div class="revealer__layer revealer__layer--3"></div>

      <!-- Image loading phase -->
      <div class="image-loading">
        <div class="image-stack"></div>
      </div>
    </div>

    {% include scripts.md %}

  </body>
</html>
