@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  com.network.core startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Add default JVM options here. You can also use JAVA_OPTS and COM_NETWORK_CORE_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto init

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto init

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:init
@rem Get command-line arguments, handling Windows variants

if not "%OS%" == "Windows_NT" goto win9xME_args

:win9xME_args
@rem Slurp the command line arguments.
set CMD_LINE_ARGS=
set _SKIP=2

:win9xME_args_slurp
if "x%~1" == "x" goto execute

set CMD_LINE_ARGS=%*

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\com.network.core-1.0.0.jar;%APP_HOME%\lib\snmp4j-2.6.3.jar;%APP_HOME%\lib\gitbucket_2.11-4.3.0.jar;%APP_HOME%\lib\persistence-api-1.0.jar;%APP_HOME%\lib\pcap4j-packetfactory-static-1.7.3.jar;%APP_HOME%\lib\pcap4j-core-1.7.3.jar;%APP_HOME%\lib\guava-11.0.2.jar;%APP_HOME%\lib\twirl-api_2.11-1.0.4.jar;%APP_HOME%\lib\commons-lang3-3.5.jar;%APP_HOME%\lib\log4j-1.2.14.jar;%APP_HOME%\lib\scala-java8-compat_2.11-0.7.0.jar;%APP_HOME%\lib\scalatra-json_2.11-2.4.1.jar;%APP_HOME%\lib\scalatra_2.11-2.4.1.jar;%APP_HOME%\lib\json4s-jackson_2.11-3.3.0.jar;%APP_HOME%\lib\scalatra-forms_2.11-1.0.0.jar;%APP_HOME%\lib\slick_2.11-2.1.0.jar;%APP_HOME%\lib\akka-actor_2.11-2.3.15.jar;%APP_HOME%\lib\akka-quartz-scheduler_2.11-1.4.0-akka-2.3.x.jar;%APP_HOME%\lib\json4s-core_2.11-3.3.0.jar;%APP_HOME%\lib\scala-xml_2.11-1.0.5.jar;%APP_HOME%\lib\scalatra-common_2.11-2.4.1.jar;%APP_HOME%\lib\grizzled-slf4j_2.11-1.0.2.jar;%APP_HOME%\lib\rl_2.11-0.4.10.jar;%APP_HOME%\lib\scala-parser-combinators_2.11-1.0.4.jar;%APP_HOME%\lib\json4s-ast_2.11-3.3.0.jar;%APP_HOME%\lib\json4s-scalap_2.11-3.3.0.jar;%APP_HOME%\lib\scala-library-2.11.8.jar;%APP_HOME%\lib\org.eclipse.jgit.http.server-4.1.2.201602141800-r.jar;%APP_HOME%\lib\org.eclipse.jgit.archive-4.1.2.201602141800-r.jar;%APP_HOME%\lib\commons-io-2.4.jar;%APP_HOME%\lib\solidbase-1.0.0.jar;%APP_HOME%\lib\markedj-1.0.9.jar;%APP_HOME%\lib\commons-compress-1.11.jar;%APP_HOME%\lib\commons-email-1.4.jar;%APP_HOME%\lib\org.eclipse.jgit-4.1.2.201602141800-r.jar;%APP_HOME%\lib\httpclient-4.5.1.jar;%APP_HOME%\lib\tika-core-1.13.jar;%APP_HOME%\lib\jldap-2009-10-07.jar;%APP_HOME%\lib\h2-1.4.192.jar;%APP_HOME%\lib\mysql-connector-java-5.1.39.jar;%APP_HOME%\lib\postgresql-9.4.1208.jar;%APP_HOME%\lib\logback-classic-1.1.7.jar;%APP_HOME%\lib\HikariCP-2.4.6.jar;%APP_HOME%\lib\config-1.3.0.jar;%APP_HOME%\lib\xhub4j-core-1.0.0.jar;%APP_HOME%\lib\jna-4.2.1.jar;%APP_HOME%\lib\mime-util-2.1.3.jar;%APP_HOME%\lib\sshd-core-1.0.0.jar;%APP_HOME%\lib\slf4j-jdk14-1.7.12.jar;%APP_HOME%\lib\quartz-2.2.1.jar;%APP_HOME%\lib\slf4j-api-1.7.20.jar;%APP_HOME%\lib\jsr305-1.3.9.jar;%APP_HOME%\lib\org.osgi.core-4.3.1.jar;%APP_HOME%\lib\juniversalchardet-1.0.3.jar;%APP_HOME%\lib\joda-time-2.9.1.jar;%APP_HOME%\lib\joda-convert-1.8.1.jar;%APP_HOME%\lib\jackson-databind-2.6.2.jar;%APP_HOME%\lib\liquibase-core-3.4.1.jar;%APP_HOME%\lib\javax.mail-1.5.2.jar;%APP_HOME%\lib\activation-1.1.1.jar;%APP_HOME%\lib\httpcore-4.4.3.jar;%APP_HOME%\lib\commons-logging-1.2.jar;%APP_HOME%\lib\commons-codec-1.9.jar;%APP_HOME%\lib\bcpg-jdk15on-1.52.jar;%APP_HOME%\lib\bcpkix-jdk15on-1.52.jar;%APP_HOME%\lib\tomcat-apr-5.5.23.jar;%APP_HOME%\lib\logback-core-1.1.7.jar;%APP_HOME%\lib\jsch-0.1.53.jar;%APP_HOME%\lib\JavaEWAH-0.7.9.jar;%APP_HOME%\lib\org.eclipse.jdt.annotation-1.1.0.jar;%APP_HOME%\lib\paranamer-2.8.jar;%APP_HOME%\lib\jackson-annotations-2.6.0.jar;%APP_HOME%\lib\jackson-core-2.6.2.jar;%APP_HOME%\lib\bcprov-jdk15on-1.52.jar

@rem Execute com.network.core
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %COM_NETWORK_CORE_OPTS%  -classpath "%CLASSPATH%" com.network.core.ApplicationMain %CMD_LINE_ARGS%

:end
@rem End local scope for the variables with windows NT shell
if "%ERRORLEVEL%"=="0" goto mainEnd

:fail
rem Set variable COM_NETWORK_CORE_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
if  not "" == "%COM_NETWORK_CORE_EXIT_CONSOLE%" exit 1
exit /b 1

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
