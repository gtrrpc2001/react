import { graphKindButton } from "../../axios/interface/graph";
import HeartCheckIcon from "../../assets/image/heart_check.svg?raw";
import RunningIcon from "../../assets/image/directions_run.svg?raw";
import SignalIcon from "../../assets/image/vital_signs.svg?raw";
import StressIcon from "../../assets/image/sentiment_stressed.svg?raw";
import DownloadIcon from "../../assets/image/download.svg?raw";
import { useTranslation } from "react-i18next";

const GraphOption = (
  kind: graphKindButton,
  zoomInside: boolean,
  kindButtonHandler: (id: string) => void,
  downloadECG: () => void
) => {
  const [t, _i18n] = useTranslation();
  const setIconColor = () => {
    return {
      color: "#4D9FC9",
      borderColor: "#4D9FC9",
      borderWidth: 1,
      borderType: "solid",
    };
  };

  const extractPathData = (Icon: string, index?: number) => {
    const parser = new DOMParser();
    const svgDocumnet = parser.parseFromString(Icon, "image/svg+xml");

    const pathElement = svgDocumnet.querySelectorAll("path");
    if (pathElement) {
      const dData = pathElement[index ? index : 0].getAttribute("d");
      return dData;
    }

    return "";
  };

  return {
    opts: {
      width: "100%",
    },

    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const data = params[0];
        return `<div>
                    <b>시간 : ${data.name}</b>
                    <b>값 : ${data.value}</b>
                    </div>`;
      },
    },

    toolbox: {
      show: true,
      orient: "vertical",
      left: "5",
      top: "middle",
      itemSize: 30,
      itemGap: 16,
      emphasis: {
        iconStyle: {
          color: "#4D9FC9",
          borderColor: "#4D9FC9",
          borderWidth: 1,
          borderType: "solid",
          textPosition: "bottom",
        },
      },

      feature: {
        myHrvData: {
          show: true,
          title: t("Diagnosis"),
          icon: extractPathData(HeartCheckIcon), // 수정 영역
          iconStyle: kind.bpm_hrv_arr ? setIconColor() : {},
          onclick: () => {
            kindButtonHandler("bpm_hrv_arr");
          },
        },
        myLivingData: {
          show: true,
          title: t("Daily"),
          icon: extractPathData(RunningIcon, 1), // 수정 영역
          iconStyle: kind.cal_step ? setIconColor() : {},
          onclick: () => {
            kindButtonHandler("cal_step");
          },
        },

        myStressData: {
          show: true,
          title: t("Stress"),
          icon: extractPathData(StressIcon),
          iconStyle: kind.stress ? setIconColor() : {},
          onclick: () => {
            kindButtonHandler("stress");
          },
        },

        myEcgData: {
          show: true,
          title: "ECG",
          icon: extractPathData(SignalIcon), // 수정 영역
          iconStyle: kind.ecg ? setIconColor() : {},
          onclick: () => {
            kindButtonHandler("ecg");
          },
        },
        myEcgDownload: {
          show: kind.ecg || kind.bpm_hrv_arr || kind.stress ? true : false,
          title: t("Download"),
          icon: extractPathData(DownloadIcon), // 수정 영역
          onclick: () => {
            downloadECG();
          },
        },
      },
    },

    grid: {
      top: 30,
      bottom: 70,
      left: 60,
      right: 20,
      containLabel: true,
    },

    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: 2,
        bottom: 30,
        brushSelect: false,
        handleSize: "0%",
      },
      zoomInside
        ? {
            type: "inside",
          }
        : null,
    ],
  };
};

export const EcgGraphOption = (
  kind: graphKindButton,
  data: any[],
  zoomInside: boolean,
  xaxisFormatter: (item: string, index: number) => void,
  kindButtonHandler: (id: string) => void,
  downloadECG: () => void
) => {
  const [_t, _i18n] = useTranslation();

  return {
    ...GraphOption(kind, zoomInside, kindButtonHandler, downloadECG),
    xAxis: {
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: (value: string, index: number) =>
          xaxisFormatter(value, index),
        interval: 0,
        rotate: 45,
      },
      type: "category",
      data: data.map((item) => item.writetime),
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 1000,
    },
    series: [
      {
        data: data.map((item) => item.ecg),
        type: "line",
        smooth: false,
        symbol: "none",
      },
    ],
  };
};

export const HrvGraphOption = (
  kind: graphKindButton,
  data: any[],
  zoomInside: boolean,
  xaxisFormatter: (item: string, index: number) => void,
  kindButtonHandler: (id: string) => void,
  downloadECG: () => void
) => {
  const [t, _i18n] = useTranslation();

  return {
    ...GraphOption(kind, zoomInside, kindButtonHandler, downloadECG),
    color: ["#5C7BD9", "#9FE080", "#ff0000"],
    xAxis: {
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: (value: string, index: number) =>
          xaxisFormatter(value, index),
        interval: 0,
        rotate: 45,
      },
      type: "category",
      data: data.map((item) => item.writetime),
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 200,
    },
    series: [
      {
        name: t("HRV"),
        data: data.map((item) => item.hrv),
        type: "line",
        smooth: false,
        symbol: "none",
      },
      {
        name: t("BPM"),
        data: data.map((item) => item.bpm),
        type: "line",
        smooth: false,
        symbol: "none",
      },
      {
        name: t("I.H.R Moment"),
        type: "line",
        markLine: {
          silent: true,
          symbol: "none",
          data: data
            .map((item, index) =>
              item.arr == "1"
                ? {
                    xAxis: index,
                    lineStyle: { type: "solid", color: "red", width: 2 },
                  }
                : null
            )
            .filter((line) => line !== null),
          label: {
            show: false,
          },
        },
        symbol: "none",
      },
      {
        name: "호흡수",
        symbolSize: 10,
        data: data.reduce((acc, item, index) => {
          if (item.breathe > 0) {
            acc.push([index, item.breathe]);
          }
          return acc;
        }, []),
        type: "scatter",
        itemStyle: {
          color: "RGB(0, 191, 255)",
        },
      },
    ],

    legend: {
      show: true,
      bottom: 0,
      right: 40,
      orient: "horizontal",
      icon: "rect",
    },
  };
};

export const StressGraphOption = (
  kind: graphKindButton,
  data: any[],
  zoomInside: boolean,
  xaxisFormatter: (item: string, index: number) => void,
  kindButtonHandler: (id: string) => void,
  downloadFunc: () => void
) => {
  const [_t, _i18n] = useTranslation();
  return {
    ...GraphOption(kind, zoomInside, kindButtonHandler, downloadFunc),
    color: ["#ff0000", "#0000ff"],
    xAxis: {
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: (value: string, index: number) =>
          xaxisFormatter(value, index),
        interval: 0,
        rotate: 45,
      },
      type: "category",
      data: data.map((item) => item.writetime),
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
    },
    series: [
      {
        name: "SNS",
        data: data.map((item) => item.sns_percent),
        type: "line",
        smooth: false,
        symbol: "none",
      },
      {
        name: "PNS",
        data: data.map((item) => item.pns_percent),
        type: "line",
        smooth: false,
        symbol: "none",
      },
    ],
    legend: {
      show: true,
      bottom: 0,
      right: 40,
      orient: "horizontal",
      icon: "rect",
    },
    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: 100,
        bottom: 30,
        brushSelect: false,
        handleSize: "0%",
      },
      {
        type: "inside",
      },
    ],
  };
};

export const LivingGraphOption = (
  kind: graphKindButton,
  data: any[],
  zoomInside: boolean,
  xaxisFormatter: (item: string, index: number) => void,
  kindButtonHandler: (id: string) => void,
  downloadECG: () => void
) => {
  const [t, _i18n] = useTranslation();
  return {
    ...GraphOption(kind, zoomInside, kindButtonHandler, downloadECG),

    xAxis: {
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: (value: string, index: number) =>
          xaxisFormatter(value, index),
        interval: 0,
        rotate: 45,
      },
      type: "category",
      data: data.map((item) => item.writetime),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: t("Steps"),
        data: data.map((item) => item.step),
        type: "bar",
        smooth: false,
        symbol: "none",
      },
      {
        name: t("Distance"),
        data: data.map((item) => item.distanceKM),
        type: "bar",
        smooth: false,
        symbol: "none",
      },
      {
        name: t("Calories"),
        data: data.map((item) => item.cal),
        type: "bar",
        smooth: false,
        symbol: "none",
      },
      {
        name: t("Exe Calories"),
        data: data.map((item) => item.calexe),
        type: "bar",
        smooth: false,
        symbol: "none",
      },
    ],

    legend: {
      show: true,
      bottom: 0,
      right: 40,
      orient: "horizontal",
      icon: "rect",
    },

    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: 100,
        bottom: 30,
        brushSelect: false,
        handleSize: "0%",
      },
      {
        type: "inside",
      },
    ],
  };
};
