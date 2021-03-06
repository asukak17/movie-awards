import React, { useContext, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Home, Menu, Star } from "@material-ui/icons";
import { AppBar, Badge, IconButton, Toolbar } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../Context/context";
import { Color } from "../Types/color.enum";

const useStyles = makeStyles({
  list: {
    minWidth: "250px",
    width: "25vw",
  },
  fullList: {
    width: "auto",
  },
});

export default function SideBar() {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let history = useHistory();
  const {
    state: { nominations },
  } = useContext(AppContext);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const findIcon = (text: string) => {
    switch (text) {
      case "Home":
        return <Home />;
      case "Nomination List":
        return <Star />;
      default:
        return <></>;
    }
  };

  const menuItems = [
    { title: "Home", link: "/" },
    { title: "Nomination List", link: "/nominations" },
  ];

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <Link to={item.link} key={item.title}>
            <ListItem button key={item.title}>
              <ListItemIcon style={{ color: Color.lightText }}>{findIcon(item.title)}</ListItemIcon>
              <ListItemText style={{ color: Color.lightText }} primary={item.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <nav>
      <AppBar color="inherit" style={{ backgroundColor: Color.darkBg }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
          >
            <Menu />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => history.push("/nominations")}
            edge="start"
            style={{ color: Color.lightText }}
          >
            <Badge badgeContent={nominations.length} color="error">
              <Star />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{ style: { backgroundColor: Color.darkBg } }}
        anchor={"left"}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </nav>
  );
}
