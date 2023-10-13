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

  public boolean isChecked() {
    return getProps().isChecked();
  }

  public void setChecked(final boolean checked) {
    getProps().setChecked(checked);

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

    private boolean checked;

    // Getters/setters
    //--------------------------------------------------

    public boolean isChecked() {
      return checked;
    }

    public void setChecked(final boolean checked) {
      this.checked = checked;
    }

  }

}
