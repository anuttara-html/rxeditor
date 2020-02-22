export class RXEditorCommandProxy{
  constructor(){
    window.addEventListener("message", (event)=>{
        this.handleMessage(event.data)
    });

    this.focusNode = (node)=>{
      this.sendMessage({
        name: 'focusNode',
        node:{
          id:node.$id,
          meta:node.$meta,
          schema:node.$schema,
        }
      })
    }

    this.unFocusNode = (node)=>{
      this.sendMessage({
        name: 'unFocusNode',
        id: node.$id,
      })
    }
  }

  rxeditorReady(){
    this.sendMessage({
      name: 'rxeditorReady'
    })
  }

  commandsHistoryChanged(canUndo, canRedo){
    this.sendMessage({
      name: 'commandsHistoryChanged',
      canUndo: canUndo,
      canRedo:canRedo,
    })
  }

  takeOverDraggingByWorkspace(){
    this.sendMessage({
      name: 'takeOverDraggingByWorkspace'
    })
  }

  saveCodeFiles(innerHTML, json){
    this.sendMessage({
      name: 'saveCodeFiles',
      innerHTML:innerHTML,
      json:json,
    })
  }


  handleMessage(message){
    //console.log('received:' + message.name + ":" + message.rxNameId)
    switch (message.name) {
      case 'requestAssemble':
        let toolboxInfo = this.serveForRXEditor.getElementDefine(message.rxNameId)
        this.sendMessage({
          name:'replyAssemble',
          toolboxInfo:toolboxInfo
        })
        break;
      case 'draggingFromToolbox':
        this.serveForRXEditor.dragFromToolbox(message.rxNameId)
        break;
      case 'endDragFromToolbox':
        this.serveForRXEditor.endDragFromToolbox(message.rxNameId)
        break;
      case 'changeCanvasState':
        this.serveForRXEditor.changeCanvasState(message.state)
        break;
      case 'nodeChanged':
        this.serveForRXEditor.nodeChanged(message.node)
        break;
      case 'undo':
        this.serveForRXEditor.undo()
        break;
      case 'redo':
        this.serveForRXEditor.redo()
        break;
      case 'download':
        this.serveForRXEditor.download()
        break;
      case 'clearCanvas':
        this.serveForRXEditor.clearCanvas()
        break;
      case 'changeTheme':
        this.serveForRXEditor.changeTheme(message.theme)
        break;
    }
  }


  sendMessage(message){
    window.parent.postMessage(message, '/');    
  }
}

