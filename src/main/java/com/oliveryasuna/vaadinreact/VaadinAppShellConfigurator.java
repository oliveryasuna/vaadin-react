package com.oliveryasuna.vaadinreact;

import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.component.page.Viewport;

@Push
@NpmPackage(value = "react", version = "18.2.0")
@NpmPackage(value = "react-dom", version = "18.2.0")
@NpmPackage(value = "typescript-collections", version = "1.3.3")
// TODO: All of these dev once https://github.com/vaadin/flow/pull/17687.
@NpmPackage(value = "@types/react", version = "18.2.0")
@NpmPackage(value = "@types/react-dom", version = "18.2.0")
@Viewport("width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes")
public final class VaadinAppShellConfigurator implements AppShellConfigurator {

  // Constructors
  //--------------------------------------------------

  public VaadinAppShellConfigurator() {
    super();
  }

}
