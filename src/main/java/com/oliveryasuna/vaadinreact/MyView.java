package com.oliveryasuna.vaadinreact;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.Route;

@Route("")
public class MyView extends Div {

  // Constructors
  //--------------------------------------------------

  public MyView() {
    super();

    add(new Span("Hello, World!"));

    final MyComponent myComponent = new MyComponent();

    myComponent.setName("Oliver");

    add(myComponent);
  }

}
