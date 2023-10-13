package com.oliveryasuna.vaadinreact;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("")
public class MyView extends Div {

  // Constructors
  //--------------------------------------------------

  public MyView() {
    super();

    final MyComponent myComponent1 = new MyComponent();
    myComponent1.setName("Matti");

    final MyComponent myComponent2 = new MyComponent();
    myComponent2.setName("Oliver");

    final MuiCheckbox muiCheckbox = new MuiCheckbox();
    muiCheckbox.setChecked(true);

    add(myComponent1, myComponent2, muiCheckbox);
  }

}
