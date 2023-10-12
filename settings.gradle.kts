rootProject.name = "vaadin-react"

pluginManagement {
  repositories {
    mavenCentral()
    gradlePluginPortal()
  }

  plugins {
    id("org.springframework.boot").version(extra["version.spring-boot"] as String)
    id("com.vaadin").version(extra["version.vaadin"] as String)
  }
}

dependencyResolutionManagement {
  repositoriesMode = RepositoriesMode.FAIL_ON_PROJECT_REPOS

  repositories {
    mavenCentral()
    maven { url = uri("https://maven.vaadin.com/vaadin-addons") }
    maven { url = uri("https://maven.vaadin.com/vaadin-prereleases") }
    mavenLocal()
  }

  versionCatalogs {
    create("libs") {
      // BOMs.
      library("bom.springBoot", "org.springframework.boot:spring-boot-dependencies:${extra["version.spring-boot"]}")
      library("bom.vaadin", "com.vaadin:vaadin-bom:${extra["version.vaadin"]}")
    }
  }
}
