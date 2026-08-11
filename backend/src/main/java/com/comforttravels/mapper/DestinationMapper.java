package com.comforttravels.mapper;

import com.comforttravels.dto.DestinationDto;
import com.comforttravels.entity.Destination;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface DestinationMapper {
    DestinationMapper INSTANCE = Mappers.getMapper(DestinationMapper.class);
    DestinationDto toDto(Destination e);
    java.util.List<DestinationDto> toDto(java.util.List<Destination> list);
}