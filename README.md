# Nodejs Application Develop Applicant Coding Assignment

## Description

Create a server-side application that accepts “widgets” and “instructions” which perform various
transformations on the widgets as explained below. In addition end points are needed to query data and
transformation logs. Any time a transformation is made it needs to be logged to a log file as detailed
below.
A widget looks like this:

```{javascript}
{ color: <String>, shape: <circle, square, triangle>, qualities: [up, down, strange, charm, bottom,
top] }
```

An instruction looks like this:

```{javascript}
{direction: <incoming|outgoing>, criteria: <shape and/or list of qualities>, color:<String>}
```

## Requirements

- widgets and instructions should be submitted as posts and updates as puts DONE
- multiple widgets or instructions can be submitted at once DONE
- instructions have a unique key based on direction and criteria – new entries overwrite old ones DONE
- an instruction dictates what color a widget should be colored based on the criteria DONE
- “incoming” means the widget should be updated before being committed to the db and saved in
  db DONE
- “outgoing” means the original widget is stored in the db, and the transformation only happens
  when the widget is requested DONE
- each time a transformation happens, it needs to be added to a log file stored on the file system DONE
- there should be a separate log file for each color DONE
- log entry should include datetime, the instruction used, original state of widget, transformed
  state of widget, and if the transformation occurred when it was ingoing or outgoing DONE
- widgets and instructions should each be in their own collection DONE
- widgets and instructions can be deleted by sending a delete request with its \_id
- widgets can be requested by shape and/or qualities or all
- log files can be requested by color
- all data should be in json except for logs which can be plain text DONE
- use latest LTS of nodejs and express DONE
- use mongodb v3.4 and latest mongoose DONE
- use TDD/BDD for all development using mocha chai, and sinon if you need spies, stubs,
  mocks, etc. DONE
- no front end is necessary, you can use postman to make requests DONE
- run server on port 9050 DONE

## Notes

- Please complete the assignment by Monday, February 24st – if this is not enough time, please let
  me know
- Zip up your whole application and send to me at dovid@osmsolutions.com or you can create a
  github repo
- You will be paid a consulting fee of \$200 for completing the assignment
- If you have any questions or anything unclear, please ask
