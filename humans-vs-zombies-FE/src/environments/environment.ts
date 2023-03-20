export const environment = {
  production: false,
  APIUsers: 'http://localhost:8080/api/v1/user',
  APIGames: 'http://localhost:8080/api/v1/game',
  APIMission: 'http://localhost:8080/api/v1/game/{gameId}/mission',
  APISquadCheckin:
    'http://localhost:8080/api/v1/game/{gameId}/squad/{squadId}/check-in',
  APIKill: 'http://localhost:8080/api/v1/game/{gameId}/kill',
  APIKey: '',
};
