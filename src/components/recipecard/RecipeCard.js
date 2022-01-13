// RecipeCard are displayed in the Search-pages as results
import React, { useEffect } from "react";
import styles from "./RecipeCard.module.scss";
import { Link } from "react-router-dom";
import ToggleFavorites from "../toggleFavorites/ToggleFavorites";
import RecipeIcons from "../recipeIcons/RecipeIcons";

function RecipeCard( { recipesSearchResult } ) {

  // useEffect(()=>{
  //   // console.log(recipesSearchResult);
  //   // console.log(recipesSearchResult[0].id);
  // })

  return (
    <>
      { recipesSearchResult &&

        <div className={ styles["recipe-cards"] }>

          { recipesSearchResult.map( ( recipe ) =>
            <article className={ styles["single-recipe-card"] } key={ recipe.id }>

              <div className={ styles["input-favorite"] }>
                <ToggleFavorites recipe={ recipe.id }/>
              </div>

              <Link to={ `/recipe/${ recipe.id }` }>

                <div className={ styles["image-container"] }>
                  <img className={ styles["recipe-card-image"] }
                       src={ `${ recipe.image }` }
                       alt={ `${ recipe.title }` }/>
                </div>
              </Link>

              <div className={ styles["recipe-card-text-container"] }>
                <Link to={ `/recipe/${ recipe.id }` }>
                  <div className={ styles["recipe-card-title"] }>{ `${ recipe.title }` }</div>
                </Link>

                <div className={ styles["recipe-card-icon-container"] }>
                  <RecipeIcons className={ styles["recipe-icons"] } recipe={ recipe }/>
                </div>
              </div>

            </article>
          ) }
        </div>
      }
    </>
  );
}

export default RecipeCard;