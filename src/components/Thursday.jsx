import React, { Component } from 'react';
import '../css/days.css';

class Thursday extends Component {
  constructor(props){
    super(props);
    this.state = {
      thursdayList: []
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
    const thursdayList = [...this.state.thursdayList];
    thursdayList.push(newItem);
    this.setState({
      thursdayList,
    });
    // update sessionStorage
    localStorage.setItem("thursdayList", JSON.stringify(thursdayList));
    this._inputNote.value = "";
    event.preventDefault();
    };
  }
  addPriority(key){
    const thursdayList = this.state.thursdayList;
    for (var i in thursdayList) {
      if (thursdayList[i].key === key) {
        thursdayList[i].priority = thursdayList[i].priority === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({thursdayList});
    localStorage.setItem("thursdayList", JSON.stringify(thursdayList));
    return;    
  };
  addDone(key){
    const thursdayList = this.state.thursdayList;
    for (var i in thursdayList) {
      if (thursdayList[i].key === key) {
        thursdayList[i].complete = thursdayList[i].complete === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({thursdayList});
    localStorage.setItem("thursdayList", JSON.stringify(thursdayList));
    return;
  }; 
  delete(key){
    const thursdayList = [...this.state.thursdayList];
    const updatedNotesList = thursdayList.filter(item => item.key !== key);  
    this.setState({ thursdayList: updatedNotesList }); 
    localStorage.setItem("thursdayList", JSON.stringify(updatedNotesList));
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
        
        <h3 className="task-title">Task for Thursday</h3>
        <ol className="noteList">
        {this.state.thursdayList.map(thursdayList => {
          // handle button
          var classes = 'noteList-note';
          var btnStarClass = 'btn-priority';
          if (thursdayList.priority === 'true') {
            classes = classes + ' noteList-note-priority-hight';
            btnStarClass = btnStarClass = ' checked'
          };
          if (thursdayList.complete === 'true') {
		      	classes = classes + ' noteList-note-done';
          };          
                    
          return (                                    
            <li className = {classes} key={thursdayList.key}>
              <div className="note-item">
                {thursdayList.note}
              </div>
              <div className="note-button" >
                <button className={btnStarClass} onClick={() => this.addPriority(thursdayList.key)}><span className="fa fa-star "></span></button>
                <button className="btn-done" onClick={()=> this.addDone(thursdayList.key)}><i className="material-icons ico-done">&#xe876;</i>Done</button>
                <button className="btn-delete" onClick={() => this.delete(thursdayList.key)}><i className="material-icons ico-done">&#xe872;</i>Delete</button>
              </div>              
            </li>  
          )
        })}
        </ol>
      </div>
    );
  }
}

export default Thursday;