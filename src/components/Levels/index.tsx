import React, { useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { FirebaseClassContext } from '../App';
import Level1 from './Level1';
import Level2 from './Level2';

// Add new levels here
export const LEVELS: { [url: string]: JSX.Element } = {
  'level1': <Level1 />,
  'level2': <Level2 />
};
export const INITIAL_LEVEL: string = 'level1';

interface LevelProps {
  children: JSX.Element[];
  isCompleted: boolean;
  levelUrl: string;
  nextLevelUrl: string;
};

export default function Level(props: LevelProps): JSX.Element {
  const user = useContext(FirebaseClassContext).user;

  useEffect(() => {
    console.log(user);
  }, [ user ]);

  if (!user) {
    return <Redirect to={'/'} />;
  } else if (user.level && user.level != props.levelUrl) {
    return (
      <div>
        <h3>nah ah ah</h3>
        <Link to={`/${user.level}`}>Go back whence you came</Link>
      </div>
    );
  } else if (props.isCompleted) {
    return <Redirect to={`/${props.nextLevelUrl}`} />
  }

  return (
    <div>
      {props.children}
    </div>
  );
}
