import React, { Component } from 'react';
import '../css/days.css';

class Friday extends Component {
  constructor(props){
    super(props);
    this.state = {
      fridayList: []
    }
    this.addNote = this.addNote.bind(this);
    this.addPriority = this.addPriority.bind(this);
    this.addDone = this.addDone.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();      
 }
 
  addNote(event){
    if (this._inputNote.value !== "") {        
      var newItem = {
        key: 1 + Date.now(),
        note: this._inputNote.value,        
        priority:'false',
        complete:'false'        
      }; 
    //add note in notelist
    const fridayList = [...this.state.fridayList];
    fridayList.push(newItem);
    this.setState({
      fridayList,
    });
    // update sessionStorage
    localStorage.setItem("fridayList", JSON.stringify(fridayList));
    this._inputNote.value = "";
    event.preventDefault();
    };
  }
  addPriority(key){
    const fridayList = this.state.fridayList;
    for (var i in fridayList) {
      if (fridayList[i].key === key) {
        fridayList[i].priority = fridayList[i].priority === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({fridayList});
    localStorage.setItem("fridayList", JSON.stringify(fridayList));
    return;    
  };
  addDone(key){
    const fridayList = this.state.fridayList;
    for (var i in fridayList) {
      if (fridayList[i].key === key) {
        fridayList[i].complete = fridayList[i].complete === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({fridayList});
    localStorage.setItem("fridayList", JSON.stringify(fridayList));
    return;
  }; 
  delete(key){
    const fridayList = [...this.state.fridayList];
    const updatedNotesList = fridayList.filter(item => item.key !== key);  
    this.setState({ fridayList: updatedNotesList }); 
    localStorage.setItem("fridayList", JSON.stringify(updatedNotesList));
  }
  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);  
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  render() {
    return (
      <div className="Day">
        <form className="form" >
          <input type="input" name="input" className="input" placeholder="Your task for today" ref={(a) => this._inputNote = a} required />
          <button type="submit" className="btn" onClick={this.addNote}> Submit </button>
        </form>
        
        <h3 className="task-title">Task for Friday</h3>
        <ol className="noteList">
        {this.state.fridayList.map(fridayList => {
          // handle button
          var classes = 'noteList-note';
          var btnStarClass = 'btn-priority';
          if (fridayList.priority === 'true') {
            classes = classes + ' noteList-note-priority-hight';
            btnStarClass = btnStarClass = ' checked'
          };
          if (fridayList.complete === 'true') {
		      	classes = classes + ' noteList-note-done';
          };          
                    
          return (                                    
            <li className = {classes} key={fridayList.key}>
              <div className="note-item">
                {fridayList.note}
              </div>
              <div className="note-button" >
                <button className={btnStarClass} onClick={() => this.addPriority(fridayList.key)}><span className="fa fa-star "></span></button>
                <button className="btn-done" onClick={()=> this.addDone(fridayList.key)}><i className="material-icons ico-done">&#xe876;</i>Done</button>
                <button className="btn-delete" onClick={() => this.delete(fridayList.key)}><i className="material-icons ico-done">&#xe872;</i>Delete</button>
              </div>              
            </li>  
          )
        })}
        </ol>
      </div>
    );
  }
}


export default Friday;