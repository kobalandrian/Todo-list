import React, { Component } from 'react';
import '../css/days.css';

class Saturday extends Component {
  constructor(props){
    super(props);
    this.state = {
      saturdayList: []
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
    const saturdayList = [...this.state.saturdayList];
    saturdayList.push(newItem);
    this.setState({
      saturdayList,
    });
    // update sessionStorage
    localStorage.setItem("saturdayList", JSON.stringify(saturdayList));
    this._inputNote.value = "";
    event.preventDefault();
    };
  }
  addPriority(key){
    const saturdayList = this.state.saturdayList;
    for (var i in saturdayList) {
      if (saturdayList[i].key === key) {
        saturdayList[i].priority = saturdayList[i].priority === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({saturdayList});
    localStorage.setItem("saturdayList", JSON.stringify(saturdayList));
    return;    
  };
  addDone(key){
    const saturdayList = this.state.saturdayList;
    for (var i in saturdayList) {
      if (saturdayList[i].key === key) {
        saturdayList[i].complete = saturdayList[i].complete === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({saturdayList});
    localStorage.setItem("saturdayList", JSON.stringify(saturdayList));
    return;
  }; 
  delete(key){
    const saturdayList = [...this.state.saturdayList];
    const updatedNotesList = saturdayList.filter(item => item.key !== key);  
    this.setState({ saturdayList: updatedNotesList }); 
    localStorage.setItem("saturdayList", JSON.stringify(updatedNotesList));
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
        
        <h3 className="task-title">Task for Saturday</h3>
        <ol className="noteList">
        {this.state.saturdayList.map(saturdayList => {
          // handle button
          var classes = 'noteList-note';
          var btnStarClass = 'btn-priority';
          if (saturdayList.priority === 'true') {
            classes = classes + ' noteList-note-priority-hight';
            btnStarClass = btnStarClass = ' checked'
          };
          if (saturdayList.complete === 'true') {
		      	classes = classes + ' noteList-note-done';
          };          
                    
          return (                                    
            <li className = {classes} key={saturdayList.key}>
              <div className="note-item">
                {saturdayList.note}
              </div>
              <div className="note-button" >
                <button className={btnStarClass} onClick={() => this.addPriority(saturdayList.key)}><span className="fa fa-star "></span></button>
                <button className="btn-done" onClick={()=> this.addDone(saturdayList.key)}><i className="material-icons ico-done">&#xe876;</i>Done</button>
                <button className="btn-delete" onClick={() => this.delete(saturdayList.key)}><i className="material-icons ico-done">&#xe872;</i>Delete</button>
              </div>              
            </li>  
          )
        })}
        </ol>
      </div>
    );
  }
}


export default Saturday;