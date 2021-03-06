import React, { Component } from 'react';
import { connect } from 'react-redux'
import {fetchBets, removeBet, saveBet, refreshBet, filterBets, fetchBetsByDate} from '../actions/api-actions'
import Bet from './bet';
import { bindActionCreators } from 'redux';
import Editable from './editable';



class BetsList extends Component {

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.fetchBets(this.props.type);
    }

    onRemove = (id) => {
        this.props.removeBet(id);
    }

    onSave = (bet) => {
        this.props.saveBet(bet);
    }

    onRefresh = (bet) => {
        this.props.refreshBet(bet);
    }

    fetchBets = (time) => {
        this.props.fetchBetsByDate(time);
    }

    filteredBets = () => {
        var bets = this.props.bets.bets
        switch(this.props.bets.filter) {
            case 'SHOW_BANKERS':
                bets = bets.filter((bet)=> {
                    return bet.type === 'banker'
                })
            break;
            case 'SHOW_VALUES':
                bets = bets.filter((bet)=> {
                    return bet.type === 'value'
                })
            break;
            case 'SHOW_OTHERS':
                bets = bets.filter((bet)=> {
                    return bet.type === 'other'
                })
            break;
            case 'SHOW_INBASKET':
                bets = bets.filter((bet)=> {
                    return bet.inBasket === true
                })
            break;
            case 'SHOW_BETFAIR':
                bets = bets.filter((bet)=> {
                    return bet.betfair != null
                })
            break;
            case 'DATE_TODAY':
                bets = bets.filter((bet)=> {
                    var d = new Date()
                    var eventDate = new Date(bet.eventDate)
                    return d.toDateString() === eventDate.toDateString()
                })
            break;
            case 'DATE_TODAY':
                bets = bets.filter((bet)=> {
                    var d = new Date()
                    var eventDate = new Date(bet.eventDate)
                    return d.toDateString() === eventDate.toDateString()
                })
            break;
            case 'DATE_TODAY+1':
            bets = bets.filter((bet)=> {
                var d = new Date()
                d.setDate(d.getDate() +1);
                var eventDate = new Date(bet.eventDate)
                return d.toDateString() === eventDate.toDateString()
            })
            break;
            case 'DATE_TODAY+2':
            bets = bets.filter((bet)=> {
                var d = new Date()
                d.setDate(d.getDate() +2);
                var eventDate = new Date(bet.eventDate)
                return d.toDateString() === eventDate.toDateString()
            })
            break;
            case 'SHOW_UNMATCHED':
            bets = bets.filter( bet => {
                return bet.betfair ==null || bet.betfair.price == null
            })
            break;
            
                    
        
        }
        return bets;
    }

    renderBets() {
        
        if(!this.props.bets.bets) return <div></div>;
        return this.filteredBets().map((bet,index)=>{
           // console.log(bet)
            switch(this.props.type) {
                case 'errors':
                    return <Editable key={index} bet={bet} {...this.props} onRemove={this.onRemove} onSave={this.onSave} onRefresh={this.onRefresh}/>
                break;
                default:
                    return <Bet bet={bet} key={index}/>;
            }
        })
            
            
        
    }
    
    render() {
        return (<div>
                
                <div className="row">
                    <div className="col-sm-12">
                        <ul className="list-inline date-filters">
                            <li><a className="btn btn-primary" href="#" onClick={this.fetchBets.bind(this,'DATE_TODAY')}>Today</a></li>
                            <li><a className="btn btn-primary" href="#" onClick={this.fetchBets.bind(this,'DATE_TODAY+1')}>Today+1</a></li>
                            <li><a className="btn btn-primary" href="#" onClick={this.fetchBets.bind(this,'DATE_TODAY+2')}>Today+2</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row">{this.renderBets()}</div>
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        bets: state.bets
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBets, removeBet, saveBet, refreshBet, filterBets, fetchBetsByDate }, dispatch )
}

export default connect(mapStateToProps,mapDispatchToProps)(BetsList);