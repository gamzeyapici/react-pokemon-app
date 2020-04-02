import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux'
import { fetchPokemonItems, fetchPokemonDetail } from '../../redux/actions'

import './List.css';

import Table from '../Table/Table'
import PokemonDetail from '../Detail/Detail'

function List({ pokemons, handleFetchPokemonItems, handleFetchPokemonDetail }) {
    const [filteredData, setFilteredData] = useState(pokemons.items);
    const [nameVal, setNameVal] = useState('');

    const [selectedItem, setSelectedItem] = useState(null);

    const handleRowClick = async (row, i) => {
        handleFetchPokemonDetail(row.id);
    };

    useEffect(() => {
        handleFetchPokemonItems();
    }, []);

    useEffect(() => {
        if(pokemons.items && pokemons.items.length) {
            setFilteredData(pokemons.items);
        }
    }, [pokemons.items]);

    useEffect(() => {
        if(pokemons.detail) {
            setSelectedItem(pokemons.detail);
            window.jQuery("#pokemonDetailModal").modal('show');
        }
    }, [pokemons.detail]);


    const handleChangeFilterName = (e) => {
        const inputName = e.target.value;

        if (!inputName) {
            setFilteredData(pokemons.items);
        } else {
            setNameVal(inputName);
            setFilteredData(pokemons.items.filter((item) => {
                return item.name.toLowerCase().includes(inputName.toLowerCase());
            }));
        }
    };

    const handleChangeSortHP = (e) => {
        const value = e.target.value;

        var copyFilterData = filteredData.slice();

        switch (value) {
            case 'null':
                // Sıralama Yok
                setFilteredData(pokemons.items.filter((item) => {
                    return item.name.toLowerCase().includes(nameVal.toLowerCase());
                }));
                break;
            case '+':

                // Buyukten kucuge
                copyFilterData.sort((a, b) => {
                    var hpA = !a.hp || a.hp === 'None' ? 0 : parseInt(a.hp);
                    var hpB = !b.hp || b.hp === 'None' ? 0 : parseInt(b.hp);

                    if (hpA < hpB) return 1;
                    if (hpB < hpA) return -1;

                    return 0;
                })

                setFilteredData(copyFilterData);
                break;
            case '-':
                // Kucukten büyüge
                copyFilterData.sort((a, b) => {
                    var hpA = !a.hp || a.hp === 'None' ? 0 : parseInt(a.hp);
                    var hpB = !b.hp || b.hp === 'None' ? 0 : parseInt(b.hp);

                    if (hpA > hpB) return 1;
                    if (hpB > hpA) return -1;

                    return 0;
                })

                setFilteredData(copyFilterData);
                break;
        }
    };

    return (
        <div className="list-page container-fluid">
            <div className="row">
                <div className="col d-flex align-items-center">
                    <div className="name-filter">
                        İsme Göre Ara: &nbsp;
                        <input type="text" onChange={(e) => handleChangeFilterName(e)} />
                    </div>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
                    <div className="hp-sort">
                        HP Sıralama: &nbsp;
                        <select onChange={(e) => handleChangeSortHP(e)}>
                            <option value="null">Sıralama Yok</option>
                            <option value="+">Büyükten Küçüğe</option>
                            <option value="-">Küçükten Büyüğe</option>
                        </select>
                    </div>
                </div>
            </div>
            <Table data={filteredData} onClickRow={handleRowClick} />
            <div className="modal fade" id="pokemonDetailModal" tabIndex="-1" role="dialog" aria-labelledby="pokemonDetailModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="pokemonDetailModalLabel">{selectedItem && selectedItem.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <PokemonDetail item={selectedItem} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Kapat</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ pokemons }) => ({
    pokemons
});

const mapDispatchToProps = {
    handleFetchPokemonItems: fetchPokemonItems,
    handleFetchPokemonDetail: fetchPokemonDetail
};


export default connect(mapStateToProps, mapDispatchToProps)(List);
