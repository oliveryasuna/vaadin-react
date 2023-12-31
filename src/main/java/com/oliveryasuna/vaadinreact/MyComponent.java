package com.oliveryasuna.vaadinreact;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;

import java.io.Serializable;

@Tag("div")
@JsModule("./src/components/MyComponent/MyComponent.tsx")
public class MyComponent extends ReactComponent<MyComponent.Props> {

  // Constructor
  //--------------------------------------------------

  public MyComponent() {
    super("MyComponent", Props.class);

    bootstrapReact();
  }

  // Methods
  //--------------------------------------------------

  public String getName() {
    return getProps().getName();
  }

  public void setName(final String name) {
    getProps().setName(name);

    scheduleUpdate();
  }

  // Nested
  //--------------------------------------------------

  public static class Props implements Serializable {

    // Constructors
    //--------------------------------------------------

    public Props() {
      super();
    }

    // Fields
    //--------------------------------------------------

    private String name;

    // Getters/setters
    //--------------------------------------------------

    public String getName() {
      return name;
    }

    public void setName(final String name) {
      this.name = name;
    }

  }

}
