import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Chess from "chess.js";

const ChessGameScreen = () => {
  const [game, setGame] = useState(new Chess());

  const displayBoard = () => {
    return <Text style={{ fontFamily: "monospace" }}>{game.ascii()}</Text>;
  };

  const makeRandomMove = () => {
    const legalMoves = game.moves();
    if (legalMoves.length > 0) {
      const randomMove =
        legalMoves[Math.floor(Math.random() * legalMoves.length)];
      game.move(randomMove);
      setGame(new Chess(game.fen())); // Update the game state
    } else {
      console.log("No legal moves available.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {displayBoard()}
      <Button title="Make Random Move" onPress={makeRandomMove} />
    </View>
  );
};

export default ChessGameScreen;
