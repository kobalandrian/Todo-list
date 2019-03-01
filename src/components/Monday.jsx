import React, { Component } from 'react';
import '../css/days.css';

class Monday extends Component {
  constructor(props){
    super(props);
    this.state = {
      mondayList: []
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
    const mondayList = [...this.state.mondayList];
    mondayList.push(newItem);
    this.setState({
      mondayList,
    });
    // update sessionStorage
    localStorage.setItem("mondayList", JSON.stringify(mondayList));
    this._inputNote.value = "";
    event.preventDefault();
    };
  }
  addPriority(key){
    const mondayList = this.state.mondayList;
    for (var i in mondayList) {
      if (mondayList[i].key === key) {
        mondayList[i].priority = mondayList[i].priority === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({mondayList});
    localStorage.setItem("mondayList", JSON.stringify(mondayList));
    return;    
  };
  addDone(key){
    const mondayList = this.state.mondayList;
    for (var i in mondayList) {
      if (mondayList[i].key === key) {
        mondayList[i].complete = mondayList[i].complete === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({mondayList});
    localStorage.setItem("mondayList", JSON.stringify(mondayList));
    return;
  }; 
  delete(key){
    const mondayList = [...this.state.mondayList];
    const updatedNotesList = mondayList.filter(item => item.key !== key);  
    this.setState({ mondayList: updatedNotesList }); 
    localStorage.setItem("mondayList", JSON.stringify(updatedNotesList));
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
        
        <h3 className="task-title">Task for Monday</h3>
        <ol className="noteList">
        {this.state.mondayList.map(mondayList => {
          // handle button
          var classes = 'noteList-note';
          var btnStarClass = 'btn-priority';
          if (mondayList.priority === 'true') {
            classes = classes + ' noteList-note-priority-hight';
            btnStarClass = btnStarClass = ' checked'
          };
          if (mondayList.complete === 'true') {
		      	classes = classes + ' noteList-note-done';
          };          
                    
          return (                                    
            <li className = {classes} key={mondayList.key}>
              <div className="note-item">
                {mondayList.note}
              </div>
              <div className="note-button" >
                <button className={btnStarClass} onClick={() => this.addPriority(mondayList.key)}><span className="fa fa-star "></span></button>
                <button className="btn-done" onClick={()=> this.addDone(mondayList.key)}><i className="material-icons ico-done">&#xe876;</i>Done</button>
                <button className="btn-delete" onClick={() => this.delete(mondayList.key)}><i className="material-icons ico-done">&#xe872;</i>Delete</button>
              </div>              
            </li>  
          )
        })}
        </ol>
      </div>
    );
  }
}

export default Monday;