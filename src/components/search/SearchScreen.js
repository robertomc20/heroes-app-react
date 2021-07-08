import React, { useMemo } from 'react';
import queryString from 'query-string';

import { useLocation } from 'react-router-dom';
import { heroes } from '../../data/heroes';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    // location es una propiedad del routerdom, si vemos los componentes en la extension
    // de chrome, podemos ver esta propiedad.
    const location = useLocation();
    //console.log(location.search);
    //console.log( queryString.parse(location.search) );
    const { q = '' } = queryString.parse( location.search );
    ///console.log(q);

    const [ formValues, handleInputChange ] = useForm({
        searchText: q
    });

    const { searchText } = formValues;

    // Aqui usamos useMemo para que no busque cada vez que demos a una tecla, 
    // y que solo busque cuando query cambie
    const heroesFiltered = useMemo(() => getHeroesByName( q ), [ q ]);
    //const heroesFiltered = getHeroesByName( searchText );

    const handleSearch = (e) => {
        e.preventDefault();
        //console.log(searchText)
        history.push(`?q=${ searchText }`)
        //console.log(heroesFiltered);
    }

    return (
        <div>
            <h1>SearchScreen</h1>
            <hr/>

            <div className="row">
                <div className="col-5 animate__animated animate__fadeIn">
                    <h4> Search Form </h4>
                    <hr/>

                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>

                <div className="col-7 animate__animated animate__fadeIn">

                    <h4> Results </h4>
                    <hr/> 

                    { ( q === '' ) &&
                        <div className="alert alert-info">
                            Search a hero...
                        </div> 
                    }   

                    { ( q !== '' && heroesFiltered.length === 0 ) &&
                        <div className="alert alert-danger">
                            There is no a hero with "{ q }"
                        </div> 
                    }   
                    
                    { heroesFiltered &&
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={ hero.id }
                                { ...hero }
                            />
                        ))
                    } 

                </div>
            </div>
            
        </div>
    )
}
