import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

    // TIP***
    // En este caso es buen momento para usar use memo, obviamente no significa que
    // usaremos useMemo en todos los lados, pero si el proceso seria pesado y sentimos
    // una depreciacion cada vez que hacemos un cambio en el componente y volvemos a generar
    // este valor (heroes), conviene mucho usar useMemo (tambien lo usaremos en HeroScreen)

    const heroes = useMemo(() => getHeroesByPublisher( publisher ), [ publisher ]);
    //const heroes = getHeroesByPublisher( publisher );


    return (
        <div className="row row-cols-md-3 g-0 animate__animated animate__fadeInRight">
            {
                heroes.map( hero => (
                    <HeroCard 
                        key={ hero.id }
                        { ...hero }
                    />
                ))
            }
        </div>
    )
}
