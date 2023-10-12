package com.oliveryasuna.vaadinreact;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.page.PendingJavaScriptResult;
import com.vaadin.flow.dom.Element;

import java.lang.reflect.InvocationTargetException;

public class ReactComponent<PROPS> extends Component {

  // Static fields
  //--------------------------------------------------

  protected static final JsonMapper JSON_MAPPER = new JsonMapper();

  // Constructors
  //--------------------------------------------------

  protected ReactComponent(final String componentName, final Class<? extends PROPS> propsClass) {
    super();

    this.componentName = componentName;
    this.propsClass = propsClass;
  }

  // Fields
  //--------------------------------------------------

  private final String componentName;

  private PROPS props;

  private final Class<? extends PROPS> propsClass;

  // Methods
  //--------------------------------------------------

  protected PendingJavaScriptResult bootstrapReact() {
    final Element element = getElement();

    return element
        .executeJs("window.Vaadin.React.components." + getComponentName() + ".connector($0,$1)", element, serializeProps());
  }

  protected PendingJavaScriptResult scheduleUpdate() {
    return getElement()
        .executeJs("window.Vaadin.React.scheduleUpdate($0,$1)", getComponentName(), serializeProps());
  }

  protected PROPS createProps() {
    try {
      setPropsInternal(getPropsClass().getConstructor().newInstance());
    } catch(final InvocationTargetException | InstantiationException | IllegalAccessException | NoSuchMethodException e) {
      throw new RuntimeException(e);
    }

    return getProps();
  }

  protected String serializeProps() {
    try {
      return JSON_MAPPER.writeValueAsString(getProps());
    } catch(final JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  protected void setPropsInternal(final PROPS props) {
    this.props = props;
  }

  // Getters/setters
  //--------------------------------------------------

  public String getComponentName() {
    return componentName;
  }

  public PROPS getProps() {
    if(props == null) {
      props = createProps();
    }

    return props;
  }

  public void setProps(final PROPS props) {
    setPropsInternal(props);
    scheduleUpdate();
  }

  public Class<? extends PROPS> getPropsClass() {
    return propsClass;
  }

}
