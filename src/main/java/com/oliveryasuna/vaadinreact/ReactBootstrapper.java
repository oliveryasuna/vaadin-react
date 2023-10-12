package com.oliveryasuna.vaadinreact;

import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinServiceInitListener;
import com.vaadin.flow.server.communication.IndexHtmlRequestListener;
import com.vaadin.flow.server.communication.IndexHtmlResponse;
import com.vaadin.flow.spring.annotation.SpringComponent;
import org.jsoup.nodes.Element;

@SpringComponent
public class ReactBootstrapper implements VaadinServiceInitListener, IndexHtmlRequestListener {

  // Constructors
  //--------------------------------------------------

  public ReactBootstrapper() {
    super();
  }

  // Methods
  //--------------------------------------------------

  @Override
  public void serviceInit(final ServiceInitEvent event) {
    event.addIndexHtmlRequestListener(this);
  }

  @Override
  public void modifyIndexHtmlResponse(final IndexHtmlResponse response) {
    final Element script = new Element("script");

    script.attr("type", "module");
    script.attr("src", "./src/react/react-init.ts");

    response.getDocument().head().appendChild(script);
  }

}
