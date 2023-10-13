package com.oliveryasuna.vaadinreact;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;

import java.io.Serializable;

@Tag("div")
@JsModule("./src/components/MuiCheckbox/MuiCheckbox.tsx")
public class MuiCheckbox extends ReactComponent<MuiCheckbox.Props> {

  // Constructor
  //--------------------------------------------------

  public MuiCheckbox() {
    super("MuiCheckbox", Props.class);

    bootstrapReact();
  }

  // Methods
  //--------------------------------------------------

  public String getLabel() {
    return getProps().getLabel();
  }

  public void setLabel(final String label) {
    getProps().setLabel(label);

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

    private String label;

    // Getters/setters
    //--------------------------------------------------

    public String getLabel() {
      return label;
    }

    public void setLabel(final String label) {
      this.label = label;
    }

  }

}
