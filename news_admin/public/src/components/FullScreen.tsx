import {
    Box,
    Container,
    Typography,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Backdrop,
    Grid,
    Zoom,
    useScrollTrigger,
    Fab,
    Toolbar,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import ReactPlayer from "react-player";
  import { useParams } from "react-router";
  import { NewsType } from "../pages/Home";
  import { publicRequest } from "./../redux/requestMethod";
  import CircularProgress from "@mui/material/CircularProgress";
  import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
  import {
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";
  import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
  
  type ReportsState = {
    createdAt: string;
    id: number;
    rep_name: string;
    updatedAt: string;
  };
  
  type NewsReportState = {
    news_id: number;
    rep_id: number;
    reportCount: number;
    createdAt: string;
    updatedAt: string;
  };
  
  const FullScreen = () => {
    const { id } = useParams();
    const shareUrl = `http://www.localhost:7700/fullscreen/${id}`;
  
    useEffect(() => {
      publicRequest.get("/news/" + id).then((response) => {
        if (response.statusText === "OK") {
          setNews(response.data);
  
          publicRequest.get("/reports/").then((response) => {
            if (response.statusText === "OK") {
              setReports(response.data);
              setIsLoading(false);
            }
          });
        }
      });
    }, []);
  
    const [reports, setReports] = useState<ReportsState[]>([]);
    const [volume, setVolume] = useState(true);
    const [news, setNews] = useState<NewsType>();
    const [isLoading, setIsLoading] = useState(true);
    let selectedReport:any = null;
  
    const getReportedNews = async (rep_id: number) => {
      const res = await publicRequest.get("/news_reports/" + id);
      let newsId: number;
      if (id !== undefined) {
        newsId = parseInt(id);
  
        if (res.data.find((news: NewsReportState) => news.news_id === newsId)) {
          res.data.forEach((report: NewsReportState) => {
            if (report.rep_id !== rep_id) {
              publicRequest
                .post("/news_reports/", {
                  news_id: newsId,
                  rep_id: rep_id,
                  reportCount: 1,
                })
                .then((response) => {
                  console.log(response);
                });
            } else {
              updateCount(report);
            }
          });
        } else {
          publicRequest
            .post("/news_reports/", {
              news_id: id,
              rep_id: rep_id,
              reportCount: 1,
            })
            .then((response) => {
              console.log(response);
            });
        }
      }
    };
  
    const updateCount = async (report: NewsReportState) => {
      let { news_id, rep_id, reportCount } = report;
      reportCount++;
  
      try {
        const res = await publicRequest.put("/news_reports/unique/" + news_id, {
          rep_id: rep_id,
          reportCount: reportCount,
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleChange =
      (prop: keyof ReportsState) => (event: SelectChangeEvent) => {
        console.log(event.target.value);
        const rep_id = event.target.value;
        selectedReport = [prop];
        if (window.confirm("press ok to report")) {
          getReportedNews(parseInt(rep_id));
        }
      };
  
    const handleVolume = () => {
      console.log("Volume");
      setVolume(!volume); // unmute
    };
  
    interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
  }
  
  function ScrollTop(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const anchor = (
        (event.target as HTMLDivElement).ownerDocument || document
      ).querySelector("#back-to-top-anchor");
  
      if (anchor) {
        anchor.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  
    return (
      <Zoom in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          {children}
        </Box>
      </Zoom>
    );
  
  }
  
    const url = news?.images;
  
    const description = news?.information;
    const desc1 = description?.slice(0, 400);
    const desc2 = description?.slice(401);
  
    if (isLoading) {
      return (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      );
    }
  
    return (
      <>
        <Grid container>
          <Grid item xs={0} sm={1} md={1} lg={2}></Grid>
          <Grid item xs={12} sm={10} md={10} lg={8} sx={{}}>
            <Toolbar id="back-to-top-anchor" />
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ mt: "0px", mb: "10px" }}
              >
                <Typography
                  variant="h1"
                  sx={{ fontSize: 44, fontWeight: 600, textAlign: "center" }}
                >
                  {news?.title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container>
                  <Grid item xs={0.5} sm={0.5} md={1} lg={1}></Grid>
                  <Grid item xs={11} sm={11} md={10} lg={10}>
                    <img
                      src={url}
                      alt="image"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "5px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={0.5} sm={0.5} md={1} lg={1}></Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ pl: "3px", pr: "3px", m: 2 }}
              >
                <Typography
                  variant="h5"
                  sx={{ textAlign: "justify", overflow: "auto", textIndent: 0 }}
                >
                  {desc1}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={handleVolume}
                >
                  <ReactPlayer
                    sx={{ borderRadius: 5 }}
                    url={
                      news!.videos === undefined
                        ? "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                        : news!.videos
                    }
                    muted={volume}
                    loop={true}
                    playing
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ pl: "3px", pr: "3px", m: 2 }}
              >
                <Typography
                  variant="h5"
                  sx={{ overflow: "auto", textIndent: 0, textAlign: "justify" }}
                >
                  {desc2}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box
                  component="div"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <FacebookShareButton
                    url={shareUrl}
                    quote={news?.title}
                    className="Demo__some-network__share-button"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={shareUrl}
                    title={news?.title}
                    className="Demo__some-network__share-button"
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={shareUrl}
                    title={news?.title}
                    separator=":: "
                    className="Demo__some-network__share-button"
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 2 }}>
                <Box
                  component="div"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel
                      id="demo-simple-select-filled-label"
                      sx={{ color: "black" }}
                    >
                      Report News
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={selectedReport ? selectedReport : "report"}
                      onChange={handleChange("id")}
                      sx={{ color: "white" }}
                    >
                      {reports.map((report: ReportsState, index: number) => {
                        return (
                          <MenuItem key={index} value={report.id}>
                            {report.rep_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={0} sm={1} md={1} lg={2}></Grid>
        </Grid>
        <ScrollTop>
          <Fab
            color="secondary"
            sx={{ backgroundColor: "black" }}
            size="small"
            aria-label="scroll back to top"
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </>
    );
  };
  
  export default FullScreen;
  
  
