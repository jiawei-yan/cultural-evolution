import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { type Culture } from '@/data/cultures';

interface WorldMapProps {
  cultures: Culture[];
  selectedCulture: Culture | null;
  onCultureSelect: (culture: Culture) => void;
}

// 世界地图数据（简化版国家边界）
const worldGeoJSON: GeoJSON.FeatureCollection<
  GeoJSON.Polygon,
  { name: string }
> = {
  "type": "FeatureCollection",
  "features": [
    // 中国
    {
      "type": "Feature",
      "properties": { "name": "China" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[73.5, 53.5], [135.0, 53.5], [135.0, 18.0], [73.5, 18.0], [73.5, 53.5]]]
      }
    },
    // 印度
    {
      "type": "Feature",
      "properties": { "name": "India" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[68.0, 37.0], [97.5, 37.0], [97.5, 8.0], [68.0, 8.0], [68.0, 37.0]]]
      }
    },
    // 俄罗斯
    {
      "type": "Feature",
      "properties": { "name": "Russia" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[27.0, 77.0], [180.0, 77.0], [180.0, 41.0], [27.0, 41.0], [27.0, 77.0]]]
      }
    },
    // 欧洲（西欧）
    {
      "type": "Feature",
      "properties": { "name": "Western Europe" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-10.0, 51.0], [15.0, 51.0], [15.0, 36.0], [-10.0, 36.0], [-10.0, 51.0]]]
      }
    },
    // 欧洲（东欧）
    {
      "type": "Feature",
      "properties": { "name": "Eastern Europe" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[15.0, 55.0], [40.0, 55.0], [40.0, 45.0], [15.0, 45.0], [15.0, 55.0]]]
      }
    },
    // 意大利/希腊
    {
      "type": "Feature",
      "properties": { "name": "Italy & Greece" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[12.0, 47.0], [28.0, 47.0], [28.0, 35.0], [12.0, 35.0], [12.0, 47.0]]]
      }
    },
    // 中东/伊拉克
    {
      "type": "Feature",
      "properties": { "name": "Middle East" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[35.0, 42.0], [55.0, 42.0], [55.0, 24.0], [35.0, 24.0], [35.0, 42.0]]]
      }
    },
    // 埃及
    {
      "type": "Feature",
      "properties": { "name": "Egypt" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[25.0, 32.0], [35.0, 32.0], [35.0, 22.0], [25.0, 22.0], [25.0, 32.0]]]
      }
    },
    // 北非
    {
      "type": "Feature",
      "properties": { "name": "North Africa" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-10.0, 37.0], [25.0, 37.0], [25.0, 15.0], [-10.0, 15.0], [-10.0, 37.0]]]
      }
    },
    // 撒哈拉以南非洲
    {
      "type": "Feature",
      "properties": { "name": "Sub-Saharan Africa" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-17.0, 15.0], [51.0, 15.0], [51.0, -35.0], [-17.0, -35.0], [-17.0, 15.0]]]
      }
    },
    // 美国
    {
      "type": "Feature",
      "properties": { "name": "United States" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-125.0, 49.0], [-66.0, 49.0], [-66.0, 25.0], [-125.0, 25.0], [-125.0, 49.0]]]
      }
    },
    // 加拿大
    {
      "type": "Feature",
      "properties": { "name": "Canada" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-140.0, 70.0], [-52.0, 70.0], [-52.0, 49.0], [-140.0, 49.0], [-140.0, 70.0]]]
      }
    },
    // 墨西哥/中美洲
    {
      "type": "Feature",
      "properties": { "name": "Mexico & Central America" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-118.0, 33.0], [-77.0, 33.0], [-77.0, 7.0], [-118.0, 7.0], [-118.0, 33.0]]]
      }
    },
    // 南美洲
    {
      "type": "Feature",
      "properties": { "name": "South America" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-82.0, 13.0], [-35.0, 13.0], [-35.0, -56.0], [-82.0, -56.0], [-82.0, 13.0]]]
      }
    },
    // 澳大利亚
    {
      "type": "Feature",
      "properties": { "name": "Australia" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[113.0, -11.0], [154.0, -11.0], [154.0, -44.0], [113.0, -44.0], [113.0, -11.0]]]
      }
    },
    // 日本
    {
      "type": "Feature",
      "properties": { "name": "Japan" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[129.0, 46.0], [146.0, 46.0], [146.0, 31.0], [129.0, 31.0], [129.0, 46.0]]]
      }
    },
    // 东南亚
    {
      "type": "Feature",
      "properties": { "name": "Southeast Asia" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[95.0, 20.0], [141.0, 20.0], [141.0, -11.0], [95.0, -11.0], [95.0, 20.0]]]
      }
    },
    // 中亚/蒙古
    {
      "type": "Feature",
      "properties": { "name": "Central Asia" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[45.0, 55.0], [105.0, 55.0], [105.0, 35.0], [45.0, 35.0], [45.0, 55.0]]]
      }
    },
    // 阿拉伯半岛
    {
      "type": "Feature",
      "properties": { "name": "Arabian Peninsula" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[35.0, 32.0], [55.0, 32.0], [55.0, 12.0], [35.0, 12.0], [35.0, 32.0]]]
      }
    },
    // 土耳其/安纳托利亚
    {
      "type": "Feature",
      "properties": { "name": "Anatolia" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[26.0, 42.0], [45.0, 42.0], [45.0, 36.0], [26.0, 36.0], [26.0, 42.0]]]
      }
    },
    // 伊朗/波斯
    {
      "type": "Feature",
      "properties": { "name": "Persia" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[44.0, 39.0], [63.0, 39.0], [63.0, 25.0], [44.0, 25.0], [44.0, 39.0]]]
      }
    },
    // 英国
    {
      "type": "Feature",
      "properties": { "name": "British Isles" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-11.0, 61.0], [2.0, 61.0], [2.0, 50.0], [-11.0, 50.0], [-11.0, 61.0]]]
      }
    }
  ]
};

export function WorldMap({ cultures, selectedCulture, onCultureSelect }: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current?.parentElement) {
        const container = svgRef.current.parentElement;
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;

    // 使用 Natural Earth 投影，更好的全球视图
    const projection = d3.geoNaturalEarth1()
      .scale(width / 5.5)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath(projection);

    // 绘制海洋背景渐变
    const defs = svg.append("defs");
    const oceanGradient = defs.append("radialGradient")
      .attr("id", "oceanGradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "70%");
    
    oceanGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#1e3a5f");
    
    oceanGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#0f172a");

    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#oceanGradient)");

    // 绘制网格线
    const graticule = d3.geoGraticule()
      .step([15, 15]);
    
    svg.append("path")
      .datum(graticule())
      .attr("class", "graticule")
      .attr("d", (feature) => path(feature) ?? "")
      .attr("fill", "none")
      .attr("stroke", "#334155")
      .attr("stroke-width", 0.3)
      .attr("opacity", 0.4);

    // 绘制国家/地区
    svg.selectAll(".country")
      .data(worldGeoJSON.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", (feature) => path(feature) ?? "")
      .attr("fill", "#1e293b")
      .attr("stroke", "#475569")
      .attr("stroke-width", 0.5)
      .attr("opacity", 0.9);

    // 绘制文化圈
    cultures.forEach((culture, index) => {
      const coords = projection([culture.location.lng, culture.location.lat]);
      if (!coords) return;
      
      const [x, y] = coords;
      
      // 发光效果组
      const glowGroup = svg.append("g")
        .attr("class", "culture-glow")
        .style("cursor", "pointer")
        .on("click", () => onCultureSelect(culture));

      // 外发光圈（脉冲效果）
      glowGroup.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 0)
        .attr("fill", culture.color)
        .attr("opacity", 0.15)
        .transition()
        .duration(1000)
        .delay(index * 200)
        .attr("r", culture.radius * 2);

      // 中发光圈
      glowGroup.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 0)
        .attr("fill", culture.color)
        .attr("opacity", 0.3)
        .transition()
        .duration(1000)
        .delay(index * 200 + 100)
        .attr("r", culture.radius * 1.2);

      // 内圈
      glowGroup.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 0)
        .attr("fill", culture.color)
        .attr("opacity", 0.5)
        .transition()
        .duration(1000)
        .delay(index * 200 + 150)
        .attr("r", culture.radius * 0.7);

      // 核心圆圈
      glowGroup.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 0)
        .attr("fill", culture.color)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .style("filter", `drop-shadow(0 0 10px ${culture.color})`)
        .transition()
        .duration(800)
        .delay(index * 200 + 200)
        .attr("r", 6);

      // 选中状态
      if (selectedCulture?.id === culture.id) {
        // 选中光环
        glowGroup.append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", culture.radius * 2.5)
          .attr("fill", "none")
          .attr("stroke", culture.color)
          .attr("stroke-width", 2)
          .attr("stroke-dasharray", "4,4")
          .attr("opacity", 0.6);

        // 脉冲动画圈
        const pulseCircle = glowGroup.append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", culture.radius)
          .attr("fill", "none")
          .attr("stroke", culture.color)
          .attr("stroke-width", 1)
          .attr("opacity", 0.8);

        // 添加脉冲动画
        function pulse() {
          pulseCircle
            .transition()
            .duration(1500)
            .attr("r", culture.radius * 3)
            .attr("opacity", 0)
            .on("end", function() {
              d3.select(this)
                .attr("r", culture.radius)
                .attr("opacity", 0.8);
              pulse();
            });
        }
        pulse();
      }

      // 文化名称标签（带背景）
      const labelGroup = glowGroup.append("g")
        .attr("opacity", 0);

      // 标签背景
      const textWidth = culture.name.length * 12 + 16;
      labelGroup.append("rect")
        .attr("x", x - textWidth / 2)
        .attr("y", y + culture.radius + 8)
        .attr("width", textWidth)
        .attr("height", 22)
        .attr("rx", 4)
        .attr("fill", "rgba(15, 23, 42, 0.9)")
        .attr("stroke", culture.color)
        .attr("stroke-width", 1);

      // 标签文字
      labelGroup.append("text")
        .attr("x", x)
        .attr("y", y + culture.radius + 23)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", "11px")
        .attr("font-weight", "500")
        .text(culture.name);

      labelGroup.transition()
        .duration(500)
        .delay(index * 200 + 500)
        .attr("opacity", 1);

      // 悬停效果
      glowGroup
        .on("mouseenter", function() {
          d3.select(this).selectAll("circle")
            .transition()
            .duration(200)
            .attr("opacity", (_, circleIndex) => {
              if (circleIndex === 3) return 1;
              return 0.85;
            });

          d3.select(this).select("text")
            .transition()
            .duration(200)
            .attr("fill", "#fef3c7");
        })
        .on("mouseleave", function() {
          d3.select(this).selectAll("circle")
            .transition()
            .duration(200)
            .attr("opacity", (_, circleIndex) => {
              if (circleIndex === 0) return 0.15;
              if (circleIndex === 1) return 0.3;
              if (circleIndex === 2) return 0.5;
              if (circleIndex === 3) return 1;
              return 0.8;
            });

          d3.select(this).select("text")
            .transition()
            .duration(200)
            .attr("fill", "#fff");
        });
    });

  }, [cultures, selectedCulture, onCultureSelect, dimensions]);

  return (
    <div className="w-full h-full relative">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="rounded-lg"
      />
    </div>
  );
}
