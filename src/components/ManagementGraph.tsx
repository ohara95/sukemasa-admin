import React, { FC } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
  Bar,
  ComposedChart,
} from "recharts";

type Props = {
  chooseGraph: () => {
    日付: string;
    売上: number | undefined;
    経費: number | undefined;
  };
};
//memo 型不明
const ManagementGraph: FC<any> = ({ chooseGraph }) => (
  <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
    width={1000} //グラフ全体の幅を指定
    height={350} //グラフ全体の高さを指定
    data={chooseGraph()} //ここにArray型のデータを指定
    style={{ margin: "0 auto" }}
  >
    <XAxis
      dataKey="日付" //Array型のデータの、X軸に表示したい値のキーを指定
      interval={0}
    />
    <YAxis />
    <Tooltip />
    <Legend />
    <CartesianGrid //グラフのグリッドを指定
      stroke="#f5f5f5" //グリッド線の色を指定
    />
    <Area //面積を表すグラフ
      type="monotone" //グラフが曲線を描くように指定。default値は折れ線グラフ
      dataKey="経費" //Array型のデータの、Y軸に表示したい値のキーを指定
      stroke="#00aced" ////グラフの線の色を指定
      fillOpacity={1} ////グラフの中身の薄さを指定
      fill="rgba(0, 172, 237, 0.2)" //グラフの色を指定
    />
    <Bar //棒グラフ
      dataKey="売上" //Array型のデータの、Y軸に表示したい値のキーを指定
      barSize={20} //棒の太さを指定
      stroke="rgba(34, 80, 162, 0.2)" ////レーダーの線の色を指定
      fillOpacity={1} //レーダーの中身の色の薄さを指定
      fill="#2250A2" ////レーダーの中身の色を指定
    />
  </ComposedChart>
);

export default ManagementGraph;
