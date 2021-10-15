import React from "react";
import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

const Newest = React.lazy(() => import("./Newest"));
const Popular = React.lazy(() => import("./Popular"));
const Trending = React.lazy(() => import("./Trending"));
const TopRated = React.lazy(() => import("./TopRated"));
const NotFound = React.lazy(() => import("./NotFound"));

const Index = () => {
  return (
    <>
      <Suspense
        fallback={
          <div style={{ textAlign: "center" }}>
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Popular />
          </Route>
          <Route path="/popular" exact>
            <Popular />
          </Route>
          <Route path="/newest" exact>
            <Newest />
          </Route>
          <Route path="/trending" exact>
            <Trending />
          </Route>
          <Route path="/top_rated" exact>
            <TopRated />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default Index;
