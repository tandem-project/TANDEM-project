This project is the Graphical User Interface (GUI) of the TANDEM platform, which is written mainly on **HTML/CSS** and **JavaScript**. You can can download or clone the project and open it with any Integrated Development Environment (IDE). After executing the project in your server, any user who has the URL can access the GUI.

Prerequisites for running the project: 
1. JAVA 15 (e.g. https://java.tutorials24x7.com/blog/how-to-install-java-15-on-windows-10)
2. An IDE (e.g. for Netbeans you can follow the instracttions in https://windows.tutorials24x7.com/blog/how-to-install-netbeans-12-on-windows)
3. A server (e.g. Payara server) connected to the IDE (e.g. https://docs.payara.fish/community/docs/documentation/ecosystem/netbeans-plugin/payara-server.html)

The folder structure and the files of the project are self-explanatory. It is worth noting that there are some global variables in files commonfunctions.js and globaltools.js which can be changed by the developer. The most important ones are the **_BACKENDSERVER** (in globaltools.js), which is the IP and port of the backend (i.e. the server where the System Manager and the various Catalogues are placed), and the **_GUISERVER** (in commonfunctions.js), which is the URL for accessing the GUI.
