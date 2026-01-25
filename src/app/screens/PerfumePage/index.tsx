import { Container } from "@mui/material";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import React from "react";
import "../../../css/perfumes.css";
import Perfumes from "./Perfumes";
import ProductDetailPage from "./ChosenPerfume";
import { CartItem } from "../../../lib/types/search";

interface PerfumesPageProps {
    onAdd:(item:CartItem) => void;
}


export default function PerfumesPage(props:PerfumesPageProps) {

    const {onAdd} = props;

    const perfume = useRouteMatch();

    return (
        <div className="products-page">
            <Switch>
                <Route path={`${perfume.path}/:perfumeId`}>
                    <ProductDetailPage
                     onAdd={onAdd}
                     ></ProductDetailPage>
                </Route> 
                <Route path={`${perfume.path}`}>
                    <Perfumes 
                    onAdd={onAdd}
                     />
                </Route>
            </Switch>
        </div> 
    );
}
;