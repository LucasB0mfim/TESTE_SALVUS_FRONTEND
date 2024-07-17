import ProductsList from '../../components/ProductsList'

import {
  useGetActionGamesQuery,
  useGetSimulationGamesQuery,
  useGetSportGamesQuery,
  useGetFightGamesQuery,
  useGetRpgGamesQuery
} from '../../services/api'

const Categories = () => {
  //
  const { data: actionGames, isLoading: isLoadingAction } =
    useGetActionGamesQuery()
  const { data: simulationGames, isLoading: isLoadingSimulation } =
    useGetSimulationGamesQuery()
  const { data: sportGames, isLoading: isLoadingSports } =
    useGetSportGamesQuery()
  const { data: fightGames, isLoading: isLoadingFight } =
    useGetFightGamesQuery()
  const { data: rpgGames, isLoading: isLoadingRPG } = useGetRpgGamesQuery()
  //

  return (
    <>
      <ProductsList
        games={actionGames}
        title="Ação"
        background="black"
        id="action"
        isLoading={isLoadingAction}
      />
      <ProductsList
        games={sportGames}
        title="Esportes"
        background="gray"
        id="sports"
        isLoading={isLoadingSimulation}
      />
      <ProductsList
        games={fightGames}
        title="Luta"
        background="black"
        id="fight"
        isLoading={isLoadingSports}
      />
      <ProductsList
        games={rpgGames}
        title="RPG"
        background="gray"
        id="rpg"
        isLoading={isLoadingFight}
      />
      <ProductsList
        games={simulationGames}
        title="Simulação"
        background="black"
        id="simulation"
        isLoading={isLoadingRPG}
      />
    </>
  )
}

export default Categories
