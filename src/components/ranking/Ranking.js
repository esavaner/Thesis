import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { getUsers} from '../../helpers/service';

import './Ranking.css';


class Ranking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageCount: 1,
            perPage: 30,
            offset: 0,
            sort: 'rank',
            users: []
        }
    }

    loadUsers = async (i) => {
        let u = await getUsers();
        this.setState({
            users: u.sort((a, b) => {
                if (a[this.state.sort] < b[this.state.sort]) return -1*i;
                if (a[this.state.sort] > b[this.state.sort]) return 1*i;
                return 0;
            }).slice(this.state.offset, this.state.offset + this.state.perPage),
            pageCount: Math.ceil(u.length / this.state.perPage),
        });
    }

    handlePageClick = (data) => {
        let offset = Math.ceil(data.selected * this.state.perPage);
        this.setState({ 
            offset: offset 
        }, () => {
            this.loadUsers(1);
        });
    };

    sortRank = () => this.sortRanking('rank', 1)
    sortUser = () => this.sortRanking('username', 1)
    sortPoints = () => this.sortRanking('elo', -1)
    sortWon = () => this.sortRanking('win_ratio', -1)
    sortLost = () => this.sortRanking('total', -1)
    sortStalemate = () => this.sortRanking('stalemate', -1)

    sortRanking = (type, i) => {
        this.setState({
            offset: 0,
            sort: type
        }, () => {
            this.loadUsers(i);
        })
    }

    componentDidMount() {
        this.loadUsers(1);
    }

    render() {
        let ranking = this.state.users.map((user, i) => {
            return  <tr key={i} className={user.rank === 1 ? 'top' : 'bot'}>
                        <td>{user.rank}.</td>
                        <td><Link to={'/h/p/' + user.username}>{user.username}</Link></td>
                        <td>{user.elo}</td>
                        <td className={user.win_ratio >= 50 ? 'gr' : 'rd'}>{user.win_ratio.toFixed(1)}%</td>
                        <td>{user.total}</td>
                        <td>{user.stalemate}</td>
                    </tr>;
        });
        return (
            <div className='ranking'>
                <h1>Top 500</h1>
                <p>See the best of the best chess players, ranked using elo system</p>
                <div className='outside'>
                    <table>
                        <thead>
                            <tr>
                                <td>Rank <button onClick={this.sortRank}><FontAwesomeIcon icon='sort'/></button></td>
                                <td>Player <button onClick={this.sortUser}><FontAwesomeIcon icon='sort'/></button></td>
                                <td>Points <button onClick={this.sortPoints}><FontAwesomeIcon icon='sort'/></button></td>
                                <td>Win ratio <button onClick={this.sortWon}><FontAwesomeIcon icon='sort'/></button></td>
                                <td>Games <button onClick={this.sortLost}><FontAwesomeIcon icon='sort'/></button></td>
                                <td>Stalemates <button onClick={this.sortStalemate}><FontAwesomeIcon icon='sort'/></button></td>
                            </tr>
                        </thead>
                    </table>
                    <div className='inside'>
                        <table>
                            <tbody>
                                {ranking}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'react-paginate'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
        )
    }
}

export default Ranking;