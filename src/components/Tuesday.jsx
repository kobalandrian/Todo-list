import React, { Component } from 'react';
import '../css/days.css';


class Tuesday extends Component {
  constructor(props){
    super(props);
    this.state = {
      tuesdayList: []
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
    const tuesdayList = [...this.state.tuesdayList];
    tuesdayList.push(newItem);
    this.setState({
      tuesdayList,
    });
    // update sessionStorage
    localStorage.setItem("tuesdayList", JSON.stringify(tuesdayList));
    this._inputNote.value = "";
    event.preventDefault();
    };
  }
  addPriority(key){
    const tuesdayList = this.state.tuesdayList;
    for (var i in tuesdayList) {
      if (tuesdayList[i].key === key) {
        tuesdayList[i].priority = tuesdayList[i].priority === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({tuesdayList});
    localStorage.setItem("tuesdayList", JSON.stringify(tuesdayList));
    return;    
  };
  addDone(key){
    const tuesdayList = this.state.tuesdayList;
    for (var i in tuesdayList) {
      if (tuesdayList[i].key === key) {
        tuesdayList[i].complete = tuesdayList[i].complete === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({tuesdayList});
    localStorage.setItem("tuesdayList", JSON.stringify(tuesdayList));
    return;
  }; 
  delete(key){
    const tuesdayList = [...this.state.tuesdayList];
    const updatedNotesList = tuesdayList.filter(item => item.key !== key);  
    this.setState({ tuesdayList: updatedNotesList }); 
    localStorage.setItem("tuesdayList", JSON.stringify(updatedNotesList));
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
        
        <h3 className="task-title">Task for Tuesday</h3>
        <ol className="noteList">
        {this.state.tuesdayList.map(tuesdayList => {
          // handle button
          var classes = 'noteList-note';
          var btnStarClass = 'btn-priority';
          if (tuesdayList.priority === 'true') {
            classes = classes + ' noteList-note-priority-hight';
            btnStarClass = btnStarClass = ' checked'
          };
          if (tuesdayList.complete === 'true') {
		      	classes = classes + ' noteList-note-done';
          };          
                    
          return (                                    
            <li className = {classes} key={tuesdayList.key}>
              <div className="note-item">
                {tuesdayList.note}
              </div>
              <div className="note-button" >
                <button className={btnStarClass} onClick={() => this.addPriority(tuesdayList.key)}><span className="fa fa-star "></span></button>
                <button className="btn-done" onClick={()=> this.addDone(tuesdayList.key)}><i className="material-icons ico-done">&#xe876;</i>Done</button>
                <button className="btn-delete" onClick={() => this.delete(tuesdayList.key)}><i className="material-icons ico-done">&#xe872;</i>Delete</button>
              </div>              
            </li>  
          )
        })}
        </ol>
      </div>
    );
  }
}

export default Tuesday;