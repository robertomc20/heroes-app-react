import React, { useMemo } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { getHeroById } from '../../selectors/getHeroById';
import { heroImages } from '../../helpers/heroImages';

// esto lo pasamos a la carpeta helpers, con el fin de reutilizarlo mas facil
// import batman from '../../assets/heroes/batman.jpg'; esto serviria si seria un recurso estatico
// esto es propio de webpack, mas info en: https://webpack.js.org/guides/dependency-management/#requirecontext
// const heroImages = require.context('../../assets/heroes', true);

export const HeroScreen = ({history}) => {

    

    //const params = useParams();
    //console.log(params);

    const { heroeId } = useParams();
    //console.log(heroeId);



    // Aqui usaremos useMemo nuevamente, porque aqui estamos obteniendo el heroe y si el id
    // no cambia, no deberiamos volver a obtener esta info. (se uso memo en HeroList)
    // Estas son pequenas optimizaciones, que pueden mejorar nuestra app.
    const hero = useMemo(() => getHeroById( heroeId ), [ heroeId ]);
    //const hero = getHeroById( heroeId );
    //console.log(hero);

    if ( !hero ) {
        return <Redirect to="/" />;
    }

    const handleReturn = () => {
        if( history.length <= 2 ) {
            history.push('/'); 
        } else {
            history.goBack();
        }
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    // src={ `../assets/heroes/${ heroeId }.jpg` } esto es si esta en public/assets
                    // src={ batman } esto viene el del import, sirve para recursos estaticos
                    src={ heroImages(`./${ heroeId }.jpg`).default }
                    alt={ superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>
            <div className="col-8">
                <h3> { superhero } </h3>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b> Alter ego: </b> { alter_ego }
                    </li>
                    <li className="list-group-item">
                        <b> Publisher: </b> { publisher }
                    </li>
                    <li className="list-group-item">
                        <b> First appearance: </b> { first_appearance }
                    </li>
                </ul>
                <br/>
                <h5> Characters </h5>
                <p> { characters } </p>

                <button 
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Return
                </button>
            </div>
        </div>
    )
}
