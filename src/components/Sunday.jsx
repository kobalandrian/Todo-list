import React, { Component } from 'react';
import '../css/days.css';

class Sunday extends Component {
  constructor(props){
    super(props);
    this.state = {
     sundayList: []
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
    const sundayList = [...this.state.sundayList];
    sundayList.push(newItem);
    this.setState({
      sundayList,
    });
    // update sessionStorage
    localStorage.setItem("sundayList", JSON.stringify(sundayList));
    this._inputNote.value = "";
    event.preventDefault();
    };
  }
  addPriority(key){
    const sundayList = this.state.sundayList;
    for (var i in sundayList) {
      if (sundayList[i].key === key) {
        sundayList[i].priority = sundayList[i].priority === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({sundayList});
    localStorage.setItem("sundayList", JSON.stringify(sundayList));
    return;    
  };
  addDone(key){
    const sundayList = this.state.sundayList;
    for (var i in sundayList) {
      if (sundayList[i].key === key) {
        sundayList[i].complete = sundayList[i].complete === 'true' ? 'false' : 'true';
        break
      }      
    }
    this.setState({sundayList});
    localStorage.setItem("sundayList", JSON.stringify(sundayList));
    return;
  }; 
  delete(key){
    const sundayList = [...this.state.sundayList];
    const updatedNotesList = sundayList.filter(item => item.key !== key);  
    this.setState({ sundayList: updatedNotesList }); 
    localStorage.setItem("sundayList", JSON.stringify(updatedNotesList));
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
        
        <h3 className="task-title">Task for Sunday</h3>
        <ol className="noteList">
        {this.state.sundayList.map(sundayList => {
          // handle button
          var classes = 'noteList-note';
          var btnStarClass = 'btn-priority';
          if (sundayList.priority === 'true') {
            classes = classes + ' noteList-note-priority-hight';
            btnStarClass = btnStarClass = ' checked'
          };
          if (sundayList.complete === 'true') {
		      	classes = classes + ' noteList-note-done';
          };          
                    
          return (                                    
            <li className = {classes} key={sundayList.key}>
              <div className="note-item">
                {sundayList.note}
              </div>
              <div className="note-button" >
                <button className={btnStarClass} onClick={() => this.addPriority(sundayList.key)}><span className="fa fa-star "></span></button>
                <button className="btn-done" onClick={()=> this.addDone(sundayList.key)}><i className="material-icons ico-done">&#xe876;</i>Done</button>
                <button className="btn-delete" onClick={() => this.delete(sundayList.key)}><i className="material-icons ico-done">&#xe872;</i>Delete</button>
              </div>              
            </li>  
          )
        })}
        </ol>
      </div>
    );
  }
}


export default Sunday;