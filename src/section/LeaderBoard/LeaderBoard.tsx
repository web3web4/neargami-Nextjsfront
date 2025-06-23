"use client";
import styles from "./LeaderBoard.module.css";
import { useState, useEffect } from "react";

type PlayerData = {
  id: number;
  username: string;
  ngcCoins: number;
  topPoints: number;
  avatarUrl?: string;
};

const LeaderBoard = () => {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/leaderboard?page=0`);
        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard: ${response.status}`);
        }
        const json = await response.json();


        const leaderboardArray: any[] = Array.isArray(json) ? json : (Array.isArray(json?.data) ? json.data : []);

        const mapped: PlayerData[] = leaderboardArray.map((item: any, idx: number) => ({
          id: idx + 1,
          username: `${item.firstname ?? ""} ${item.lastname ?? ""}`.trim() || "Unknown",
          ngcCoins: item.ngc ?? 0,
          topPoints: item.top_points ?? 0,
          avatarUrl: item.image || undefined,
        }));

        // Sort by NGC coins (descending)
        setPlayers(mapped.sort((a, b) => b.ngcCoins - a.ngcCoins));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0: return styles.goldRank; 
      case 1: return styles.silverRank;
      case 2: return styles.bronzeRank;
      default: return styles.normalRank;
    }
  };

  return (
    <div className={styles.leaderboardContainer}>
      {/*
      {players.length > 0 && (
        <div className={styles.topPlayerTree}>
          <div className={styles.treeLeaves}>
            <div className={styles.playerNameInTree}>
              <span className={styles.playerRank}>#{1}</span>
              <span className={styles.playerUsername}>{players[0].username}</span>
            </div>
          </div>
          <div className={styles.treeTrunk}></div>
        </div>
      )}
      */}
      <div className={styles.leaderboardHeader}>
        <h2>{"Leaderboard"}</h2>
        <p className={styles.leaderboardSubtitle}>{"Top players ranked by NGC coins"}</p>
      </div>
      
      <div className={styles.leaderboardTable}>
        <div className={styles.tableHeader}>
          <div className={styles.rankHeader}>#</div>
          <div className={styles.playerHeader}>Player</div>
          <div className={styles.coinsHeader}>NGC Coins</div>
          <div className={styles.coursesHeader}>Top Points</div>
        </div>
        
        <div className={styles.tableBody}>
          {loading && (
            <div className={styles.loadingRow}>
              <div className={styles.spinner} />
            </div>
          )}
          {players.map((player, index) => (
            <div key={player.id} className={`${styles.tableRow} ${index < 3 ? styles.topThree : ''}`}>
              <div className={`${styles.rankCell} ${getRankStyle(index)}`}>
                {index + 1}
              </div>
              <div className={styles.playerCell}>
                <div className={styles.playerInfo}>
                  <div className={styles.playerName} title={player.username}>{player.username}</div>
                </div>
              </div>
              <div className={styles.coinsCell}>
                <span className={styles.coinValue}>{player.ngcCoins.toLocaleString()}</span>
                <span className={styles.coinLabel}>NGC</span>
              </div>
              <div className={styles.coursesCell}>
                {player.topPoints}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
