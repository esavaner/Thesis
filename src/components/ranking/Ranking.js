import React from 'react';
import ReactPaginate from 'react-paginate';
import { getUsers} from '../../helpers/service';

import './Ranking.css';


class Ranking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageCount: 1,
            perPage: 10,
            offset: 0,
            users: []
        }
    }

    loadUsers = async () => {
        let u = await getUsers();
        this.setState({
            users: u.slice(this.state.offset, this.state.offset + this.state.perPage),
            pageCount: Math.ceil([].length / this.state.perPage),
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
            return <div key={i}>{user.username}, {user.elo}, {user.highest}, {user.won}, {user.lost}, {user.stalemate}</div>;
        });
        return (
            <>
                <div>
                    {ranking}
                </div>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
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
            </>
        )
    }
}

export default Ranking;