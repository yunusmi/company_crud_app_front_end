<p>Документация <b>на русском</b> <a href="https://github.com/yunusmi/company_crud_app_front_end/blob/master/README_RU.md">здесь</a></p>

<h1>FrontEnd Client for Company Data Management</h1>

<p>This application represents a FrontEnd client for managing company data such as employees, sales, products, and branches. The project is developed using HTML/CSS3, JavaScript, jQuery, and Bootstrap 4. Upon configuration completion, the project is compiled into a desktop cross-platform application using the <a href="https://www.electronjs.org/" target="_blank">Electron JS library</a>. The client and server interact via HTTP protocol, with a REST API architectural style in JSON format.</p>

<h2>Setup</h2>

<h3>Prerequisites:</h3>

<ul>
  <li>A pre-configured BackEnd application on the server (see <a href="https://github.com/yunusmi/company_crud_app_backend/blob/master/README.md" target="_blank">instructions for installing and configuring</a> the BackEnd part on the server), including the address (IP address or domain name) and port, which need to be inserted into the client configuration file.</li>
  <li>Installed NodeJS version 17.0 or higher.</li>
  <li>Stable internet connection (required for interaction between the FrontEnd application and the server and for downloading necessary client dependencies).</li>
</ul>

<h3>Installation</h3>

<p>To start setting up the application, create a folder for the project and then clone the repository of this project with the following command:</p>

<pre><code>git clone https://github.com/yunusmi/company_crud_app_front_end.git .
</code></pre>

<p>Then install the dependencies:</p>

<pre><code>npm install
</code></pre>

<p>After installing the dependencies, edit the configuration file (config.js file in the root directory of the project). There you need to insert the server address (IP address or domain name) and port where the BackEnd part of the application is deployed (see <a href="https://github.com/yunusmi/company_crud_app_backend/blob/master/README.md" target="_blank">instructions for installing and configuring</a> the BackEnd part on the server).</p>

<p>For example:</p>

<pre><code>const serverIp = 'http://YOUR_CONFIGURED_SERVER_ADDRESS:APP_PORT/api/v1';
</code></pre>

<p>Next, you can start the application with the following command:</p>

<pre><code>npm run start
</code></pre>

<p>An application will open, which will send requests to the server, receive responses from it, and display them on the screen. To enable debugging mode for the application, uncomment lines 29 to 33 and line 39 in the <b>main.js</b> file. This will enable error outputs to the console and debugging in the application window (<b>Ctrl + Shift + I</b> command will open the console and debugging mode).</p>

<p>Press the exit button in the application or <b>Ctrl + C</b> in the terminal to close the application window.</p>

<h2>Preparation for Compilation</h2>

<p>To compile the project into a desktop application, the <a href="https://www.electronjs.org/" target="_blank">Electron JS library</a> is used.</p>

<p>Before compilation, it is recommended to disable the application's debugging mode. To do this, comment lines 29 to 33 and line 39 in the <b>main.js</b> file. Also, by default, the Electron JS library sets a default icon for the application shortcut. To set your own icon for the application shortcut, move your icon file to the <b>assets/</b> folder, then uncomment and edit the <b>main.js file at line 14 (replacing the icon name with yours)</b>.</p>

<h2>Compilation</h2>

<p>After completing all the settings above, start the process of compiling the FrontEnd application into a desktop cross-platform application with the following command:</p>

<pre><code>npm run dist
</code></pre>

<p><b>Note:</b> For the successful completion of the compilation process, it is recommended to execute this command with administrator privileges, as scripts and dependencies used during compilation require administrator rights to execute.</p>

<p>Subsequently, the process will initiate the download of additional dependencies for compilation and the creation of the installation file for the application. Upon completion of the compilation, an installation file <b>Company data management Setup</b> will appear in the <b>dist/</b> folder. This file can be opened to initiate the application installation or shared online. For Windows operating systems, by default, the system will utilize <a href="https://en.wikipedia.org/wiki/Nullsoft_Scriptable_Install_System" target="_blank">NSIS (Nullsoft Scriptable Install System)</a> for the application's installation file. The installation file is generated for the environment in which it is compiled. For example, if you compile the project on a Windows operating system, the installation file will be created only for Windows operating systems and will have the extension <b>.exe</b>. Similarly, if compiled on Linux, an installation file for the Linux operating system will be generated with the <b>.AppImage</b> extension, and so forth.</p>

<h2>Conclusion</h2>

<p>This project is distributed under the MIT license. You can use the full code of this project on your projects for free. </p>
<p align="center">If you need any help or consultations, you can contact me by email: <a href="mailto:contact@yunus-mil.ru">contact@yunus-mil.ru</a></p>
