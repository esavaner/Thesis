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
            users: []
        }
    }

    loadUsers = async () => {
        let u = await getUsers();
        this.setState({
            users: u.sort((a, b) => {
                if (a.elo < b.elo) return 1;
                if (a.elo > b.elo) return -1;
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
            this.loadUsers();
        });
    };

    componentDidMount() {
        this.loadUsers();
    }

    render() {
        let ranking = this.state.users.map((user, i) => {
            return  <tr key={i}>
                        <td>{i + 1 + this.state.offset}.</td>
                        <td><Link to={'/h/p/' + user.username}>{user.username}</Link></td>
                        <td>{user.elo}</td>
                        <td>{user.won}</td>
                        <td>{user.lost}</td>
                        <td>{user.stalemate}</td>
                    </tr>;
        });
        return (
            <div className='ranking'>
                <div className='outside'>
                    <table>
                        <thead>
                            <tr>
                                <td>Rank</td>
                                <td>Player</td>
                                <td>Points</td>
                                <td>Wins</td>
                                <td>Looses</td>
                                <td>Stalemates</td>
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