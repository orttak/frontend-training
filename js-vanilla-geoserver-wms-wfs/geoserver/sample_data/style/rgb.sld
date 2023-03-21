<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" version="1.0.0" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc">
  <UserLayer>
    <sld:LayerFeatureConstraints>
      <sld:FeatureTypeConstraint/>
    </sld:LayerFeatureConstraints>
    <sld:UserStyle>
      <sld:Name>hamburg_rgb</sld:Name>
      <sld:FeatureTypeStyle>
        <sld:Rule>
          <sld:RasterSymbolizer>
            <sld:ChannelSelection>
              <sld:RedChannel>
                <sld:SourceChannelName>1</sld:SourceChannelName>
                <sld:ContrastEnhancement>
                  <sld:Normalize>
                    <sld:VendorOption name="algorithm">StretchToMinimumMaximum</sld:VendorOption>
                    <sld:VendorOption name="minValue">1094.01</sld:VendorOption>
                    <sld:VendorOption name="maxValue">2605</sld:VendorOption>
                  </sld:Normalize>
                </sld:ContrastEnhancement>
              </sld:RedChannel>
              <sld:GreenChannel>
                <sld:SourceChannelName>2</sld:SourceChannelName>
                <sld:ContrastEnhancement>
                  <sld:Normalize>
                    <sld:VendorOption name="algorithm">StretchToMinimumMaximum</sld:VendorOption>
                    <sld:VendorOption name="minValue">1147.01</sld:VendorOption>
                    <sld:VendorOption name="maxValue">2783</sld:VendorOption>
                  </sld:Normalize>
                </sld:ContrastEnhancement>
              </sld:GreenChannel>
              <sld:BlueChannel>
                <sld:SourceChannelName>3</sld:SourceChannelName>
                <sld:ContrastEnhancement>
                  <sld:Normalize>
                    <sld:VendorOption name="algorithm">StretchToMinimumMaximum</sld:VendorOption>
                    <sld:VendorOption name="minValue">1128.99</sld:VendorOption>
                    <sld:VendorOption name="maxValue">2971</sld:VendorOption>
                  </sld:Normalize>
                </sld:ContrastEnhancement>
              </sld:BlueChannel>
            </sld:ChannelSelection>
          </sld:RasterSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </UserLayer>
</StyledLayerDescriptor>
