fun properties(key: String): String = (System.getenv(key) ?: project.findProperty(key).toString())

plugins {
  id("java")
  id("idea")
  id("org.springframework.boot")
  id("com.vaadin")
}

group = properties("project.group")
version = properties("project.version")

idea {
  module {
    isDownloadJavadoc = true
    isDownloadSources = true
  }
}

vaadin {
  frontendHotdeploy = true
}

dependencies {
  // BOMs.
  implementation(platform(libs.bom.springBoot))
  implementation(platform(libs.bom.vaadin))

  // Spring.
  implementation("org.springframework.boot:spring-boot-starter-web")
  runtimeOnly("org.springframework.boot:spring-boot-devtools")

  // Vaadin.
  implementation("com.vaadin:vaadin-core")
  implementation("com.vaadin:vaadin-spring-boot-starter")
}

tasks {
  withType<JavaCompile> {
    sourceCompatibility = "17"
    targetCompatibility = "17"
  }

  // `vaadinPrepareFrontend` is a task provided by the Vaadin Gradle plugin.
  // It is used to prepare the frontend resources for the Vaadin application.
  // This means that various resources in the `frontend` directory are modified.
  // The Vaadin plugin configured it to execute part of the `classes` task.
  // So, we need a way to execute the `classes` task without executing
  // `vaadinPrepareFrontend`.
  // This allows for hot-reloading without restarting the application.
  create("buildWithoutVaadin") {
    doFirst {
      vaadinPrepareFrontend {
        enabled = false
      }
    }
    finalizedBy(":classes")
  }
}
