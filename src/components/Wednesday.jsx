import React, { Component } from 'react';
import '../css/days.css';

class Wednesday extends Component {
  constructor(props){
    super(props);
    this.state = {
      wednesdayList: []
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
    const wednesdayList = [...this.state.wednesdayList];
    wednesdayList.push(newItem);
    this.setState({
      wednesdayList,
    });
    // update sessionStorage
    localStorage.setItem("wednesdayList", JSON.stringify(wednesdayList));
    this._inputNote.value = "";
    event.preventDefault();
    };
  }
  addPriority(key){
    const wednesdayList = this.state.wednesdayList;
    for (var i in wednesdayList) {
      if (wednesdayList[i].key === key) {
        wednesdayList[i].priority = wednesdayList[i].priority === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({wednesdayList});
    localStorage.setItem("wednesdayList", JSON.stringify(wednesdayList));
    return;    
  };
  addDone(key){
    const wednesdayList = this.state.wednesdayList;
    for (var i in wednesdayList) {
      if (wednesdayList[i].key === key) {
        wednesdayList[i].complete = wednesdayList[i].complete === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({wednesdayList});
    localStorage.setItem("wednesdayList", JSON.stringify(wednesdayList));
    return;
  }; 
  delete(key){
    const wednesdayList = [...this.state.wednesdayList];
    const updatedNotesList = wednesdayList.filter(item => item.key !== key);  
    this.setState({ wednesdayList: updatedNotesList }); 
    localStorage.setItem("wednesdayList", JSON.stringify(updatedNotesList));
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
        
        <h3 className="task-title">Task for Wednesday</h3>
        <ol className="noteList">
        {this.state.wednesdayList.map(wednesdayList => {
          // handle button
          var classes = 'noteList-note';
          var btnStarClass = 'btn-priority';
          if (wednesdayList.priority === 'true') {
            classes = classes + ' noteList-note-priority-hight';
            btnStarClass = btnStarClass = ' checked'
          };
          if (wednesdayList.complete === 'true') {
		      	classes = classes + ' noteList-note-done';
          };          
                    
          return (                                    
            <li className = {classes} key={wednesdayList.key}>
              <div className="note-item">
                {wednesdayList.note}
              </div>
              <div className="note-button" >
                <button className={btnStarClass} onClick={() => this.addPriority(wednesdayList.key)}><span className="fa fa-star "></span></button>
                <button className="btn-done" onClick={()=> this.addDone(wednesdayList.key)}><i className="material-icons ico-done">&#xe876;</i>Done</button>
                <button className="btn-delete" onClick={() => this.delete(wednesdayList.key)}><i className="material-icons ico-done">&#xe872;</i>Delete</button>
              </div>              
            </li>  
          )
        })}
        </ol>
      </div>
    );
  }
}

export default Wednesday;