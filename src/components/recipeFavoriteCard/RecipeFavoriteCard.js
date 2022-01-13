import React, { useEffect, useState } from "react";
import RecipeIngredientsList from "../recipeIngredientsList/RecipeIngredientsList";
import "./RecipeFavoriteCard.module.scss";
import { Link } from "react-router-dom";
import ToggleFavorites from "../toggleFavorites/ToggleFavorites";
import axios from "axios";
import RecipeIcons from "../recipeIcons/RecipeIcons";
import styles from "./RecipeFavoriteCard.module.scss";
import ToggleShoppingList from "../toggleShoppingList/ToggleShoppingList";
import NumberOfGuests from "../numberOfGuests/NumberOfGuests";
import Button from "../buttons/Button";

function RecipeFavoriteCard( { favRecipesId } ) {

  const source = axios.CancelToken.source();

  const [ recipe, setRecipe ] = useState();
  const [ numberOfGuests, setNumberOfGuests ] = useState();
  // cancel request if page premature closes
  useEffect( () => {
    return function cleanup() {
      source.cancel();
    };
  }, [] );

  // get recipe information from with favRecipeId
  useEffect( () => {
    async function fetchData() {
      try {
        const result = await axios.get( `https://api.spoonacular.com/recipes/${ favRecipesId }/information?includeNutrition=false/&apiKey=${ process.env.REACT_APP_SPOONACULAR_KEY }`, { cancelToken: source.token, } );
        setRecipe( result.data );
        setNumberOfGuests( result.data.servings );
        // console.log( result.data );

        return function cleanup() {
          source.cancel();
        };
      } catch ( e ) {
        // console.error( e );
      }
    }

    fetchData();
  }, [ favRecipesId ] );
  console.log( numberOfGuests );

  return (
    <>
      { recipe &&

        <div>
          <hr/>
          <article className={ styles["favorite-recipe-card-container"] } key={ `${ recipe.id }` }>


            <div className={ styles["favorite-recipe-card-heading"] }>
              <ToggleFavorites className={ styles["toggle-favorites"] } recipe={ recipe.id }/>

              <h3>{ `${ recipe.title }` }
              </h3>
            </div>
            <div>

            </div>

            <div className={ styles["columns"] }>

              <div className={ styles["left-column"] }>

                <Link to={ `/recipe/${ recipe.id }` }>
                  <div className={ styles["favorite-recipe-image-container"] }>

                    <img className={ styles["favorite-recipe-image"] }
                         src={ `${ recipe.image }` }
                         alt={ `${ recipe.title }` }/>
                  </div>
                </Link>

                <div className={ styles["recipe-card-icon-container"] }>
                  <RecipeIcons recipe={ recipe }/>
                </div>
              </div>

              <div className={ styles["middle-column"] }>
                <div className={ styles["number-of-guests-buttons"] }>
                  <h2>How many guests</h2>
                  <div className={ styles["number-of-guests"] }>
                    <p>{ `This recipe is written for ${ recipe.servings } personen.` }</p>
                    <p>
                      Select the amount of friends that are coming.
                      The ingredientslist will automatically be updated.
                    </p><p>
                    when ready click the 'add to shoppinglist'-button. The ingredients will be added to your
                    shoppinglist.
                  </p>
                  </div>

                  <NumberOfGuests
                    className={ styles["number-of-guests"] }
                    name="number-of-guests"
                    min="1"
                    inputType="number"
                    value={ numberOfGuests }
                    onChange={ e => setNumberOfGuests( e.target.value ) }
                  />

                  { numberOfGuests !== recipe.servings
                    ?
                    <Button className={ styles["reset-button"] }
                            inputType="button"
                            clickHandler={ e => setNumberOfGuests( recipe.servings ) }
                            label="reset"
                    />
                    : "" }

                </div>


                <div className={ styles["add-to-shoppinglist"] }>
                  <ToggleShoppingList recipe={ recipe } numberOfGuests={ numberOfGuests }/>
                </div>

              </div>

              <div className={ styles["right-column"] }>
                <RecipeIngredientsList recipe={ recipe } numberOfGuests={ numberOfGuests }/>
              </div>
            </div>
          </article>
        </div>
      }
    </>
  );
}

export default RecipeFavoriteCard;