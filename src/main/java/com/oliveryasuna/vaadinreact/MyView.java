package com.oliveryasuna.vaadinreact;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("")
public class MyView extends Div {

  // Constructors
  //--------------------------------------------------

  public MyView() {
    super();

    final MySimpleComponent mySimpleComponent1 = new MySimpleComponent();
    mySimpleComponent1.setName("Simple1");

//    final MySimpleComponent mySimpleComponent2 = new MySimpleComponent();
//    mySimpleComponent2.setName("Simple2");
//
//    add(mySimpleComponent1, mySimpleComponent2);
    add(mySimpleComponent1);

    final MyVerboseComponent myVerboseComponent = new MyVerboseComponent();
    myVerboseComponent.setName("Verbose");

    add(myVerboseComponent);
  }

}
